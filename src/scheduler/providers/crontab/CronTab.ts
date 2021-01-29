import { spawn as Spawn } from 'child_process';
import { ShellUtil } from '../../../shell/ShellUtil';
import { CronJob } from './CronJob';
import { CronVar } from './CronVar';


const COMMAND = 'crontab';

export class CronTab {

    private user: string;
    private root: boolean;
    private backup = { lines: [], jobs: [], vars: [] };
    lines = [] as (CronJob | CronVar | string)[];
    _jobs = [] as CronJob[];
    _vars = [];

    constructor(username, cb) {
        this.user = username || null;
        this.root = !process.getuid?.();

        this.load(cb);
    }

    jobs(options) {
        if (!options) {
            return this._jobs.slice();
        }
        if (!options.command && !options.comment) {
            return this._jobs.slice();
        }

        let queries = Object.keys(options);
        if (queries.filter(x => x !== 'comment' && x !== 'command').length > 0) {
            return [];
        }

        let results = [];
        for (let i = 0; i < this._jobs.length; i++) {
            let job = this._jobs[i];
            let match = true;

            for (let j = 0; j < queries.length; j++) {
                let query = queries[j];

                if (!job[query]().match(options[query])) {
                    match = false;
                    break;
                }
            }

            if (match) {
                results.push(job);
            }
        }

        return results;
    }
    find(options) { return this.jobs(options); };

    vars(options) {
        if (typeof options === 'string') {
            options = { name: options }
        }

        let results = [] as (any[] & { add?, rm?, val?});
        let queries = Object.keys(options);

        if (queries.length < 1) {
            results = this._vars.slice();
        }
        else if (queries.filter(x => x !== 'name' && x !== 'val').length == 0) {
            for (let i = 0; i < this._vars.length; i++) {
                let env = this._vars[i];
                let match = true;

                for (let j = 0; j < queries.length; j++) {
                    let query = queries[j];

                    if (!env[query]().match(options[query])) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    results.push(env);
                }
            }
        }

        let self = this;
        results.add = function (name, val) {
            let pairs = {};
            if (typeof name === 'string' && typeof val === 'string') {
                pairs[name] = val;
            }
            else if (typeof name === 'object' && name != null) {
                pairs = Object.assign({}, name);
            }

            let insertIndex = findIndex(self.lines, function (val) {
                return val instanceof CronJob;
            });
            if (insertIndex < 0) {
                insertIndex = 0;
            }

            for (name in pairs) {
                let val = pairs[name];
                let env = new CronVar(name + '=' + val);

                self.lines.splice(insertIndex++, 0, env);
                self._vars.push(env);
            }
        }

        results.rm = function () {
            self.lines = difference(self.lines, results);
            self._vars = difference(self._vars, results);
            results.splice(0, results.length);
        }

        results.val = function (a) {
            return results.length && results[0].val();
        }

        return results;
    }

    save(): Promise<CronTab> {
        return new Promise((resolve, reject) => {
            function cb (err, self?) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(self);
            }

            let stdout = '';
            let stderr = '';

            let { command, args } = this.makeChildCommand('save');

            let child = Spawn(command, args);
            let self = this;

            child.stdout.setEncoding('utf8');
            child.stderr.setEncoding('utf8');

            child.stdout.on('data', function (chunk) {
                stdout += chunk;
            });
            child.stderr.on('data', function (chunk) {
                stderr += chunk;
            });
            child.on('error', function (err) {
                cb(err);
            });
            child.on('close', function (code) {
                if (code == 0) {
                    cb(null, self);
                }
                else {
                    cb(new Error(stderr), self);
                }
            });

            let body = this.render();
            child.stdin.write(body);
            child.stdin.end();
        });
    }


    render() {
        let tokens = [];
        for (let i = 0; i < this.lines.length; i++) {
            let job = this.lines[i];

            if (typeof job !== 'string' && !job.isValid()) {
                tokens.push('# ' + job.toString());
                continue;
            }

            tokens.push(job.toString());
        }

        return tokens.join('\n').trim() + '\n';
    }

    create(command: string, when: string | Date, taskName: string): CronJob {
        if (when && typeof when !== 'string' && (when instanceof Date) === false) {
            return null;
        }

        command = command.trim();
        taskName = taskName.trim();

        let job:CronJob = null;
        if (typeof when === 'string') {
            job = this.makeJob(when + ' ' + command + ' #' + taskName);
        } else {
            job = this.makeJob(null, command, taskName);
        }

        if (job && when instanceof Date) {
            job.minute().on(when.getMinutes());
            job.hour().on(when.getHours());
            job.dom().on(when.getDate());
            job.month().on(when.getMonth() + 1);
        }

        if (job) {
            this._jobs.push(job);
            this.lines.push(job);
        }

        return job;
    }
    /**
     * Parses a raw crontab line and returns a CronJob object
     *
     * @param {String} __line__
     * @return {CronJob|null}
     */
    parse(line) {
        return this.makeJob(line);
    }
    /**
     * Removes the specified jobs from the crontab.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         let jobs = tab.jobs({command:'ls -l /'});
     *         tab.remove(jobs);
     *     });
     *
     * @param {String} __Array[CronJob]__
     */
    remove(job: CronJob) {
        this.removeInner(job);
        this.truncateLines();
    }
    /**
     * Restores this crontab to its original state.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         let jobs = tab.jobs({command:'ls -l /'});
     *         tab.remove(jobs);
     *         tab.reset();
     *     });
     */
    reset() {
        this.lines = this.backup.lines.slice();
        this._jobs = this.backup.jobs.slice();
        this._vars = this.backup.vars.slice();
    }

    private load(cb) {
        let stdout = '';
        let stderr = '';
        let { command, args } = this.makeChildCommand('load');



        this.lines = [];
        this._jobs = [];
        this._vars = [];

        ShellUtil
            .exec(command, args)
            .then(({ code, stdout, stderr }) => {
                if (code != 0 && stderr.indexOf('no crontab for ') < 0) {
                    cb(new Error(stderr), null);
                    return;
                }
                let tokens = stdout.split('\n');
                for (let i = 0; i < tokens.length; i++) {
                    let token = tokens[i];
                    let job = this.makeJob(token);
                    let env = this.makeVar(token);

                    if (job != null && job.isValid()) {
                        this._jobs.push(job);
                        this.lines.push(job);
                    }
                    else if (env != null && env.isValid()) {
                        this._vars.push(env);
                        this.lines.push(env);
                    }
                    else {
                        this.lines.push(token);
                    }
                }

                this.truncateLines();

                this.backup.lines = this.lines.slice();
                this.backup.jobs = this._jobs.slice();
                this.backup.vars = this._vars.slice();

                cb(null, this);
            }, error => {
                cb(error);
            })

    }


    private removeInner(job) {
        let oldJobs = this._jobs;
        let oldLines = this.lines;

        this._jobs = [];
        this.lines = [];

        for (let i = 0; i < oldJobs.length; i++) {
            let oldJob = oldJobs[i];

            if (oldJob !== job) {
                this._jobs.push(oldJob);
            }
        }
        for (let i = 0; i < oldLines.length; i++) {
            let oldLine = oldLines[i];

            if (oldLine !== job) {
                this.lines.push(oldLine);
            }
        }
    }


    /**
     * Creates a system command string to run crontab. Intended to be passed to
     * child_process.spawn. If this is going to run for another user and the
     * current user is not root, we prefix the command with sudo.
     *
     * @api private
     */
    private makeChildCommand(action: 'load' | 'save') {
        let command = COMMAND;
        if (this.user && this.root === false) {
            command = 'sudo ' + command;
        }

        let args = [];
        if (this.user) {
            args = args.concat('-u', this.user);
        }

        if (action == 'load') {
            args.push('-l');
        }
        if (action == 'save' && process.platform !== 'sunos') {
            args.push('-');
        }
        if (process.platform === 'win32') {
            args.unshift(command);
            command = `wsl`;
        }
        return { command, args };
    }
    /**
     * Creates a new job. This method exists to catch instantiation exceptions.
     * @see CronJob
     *
     * @param {String|null} __line__
     * @param {String} __[command]__
     * @param {String} __[comment]__
     *
     * @api private
     */
    private makeJob(line, command?, comment?) {
        try {
            let job = new CronJob(line, command, comment);
            if (!job || !job.isValid()) {
                throw new Error('invalid job');
            }

            return job;
        } catch (e) { }

        return null;
    }
    /**
     * Creates a new job. This method exists to catch instantiation exceptions.
     * @see CronJob
     *
     * @param {String} __line__
     *
     * @api private
     */
    private makeVar(line) {
        try {
            let env = new CronVar(line);
            if (!env || !env.isValid()) {
                throw new Error('invalid env variable');
            }

            return env;
        } catch (e) { }

        return null;
    }
    /**
     * Compacts the line collection by removes empty lines from the end.
     *
     * @api private
     */
    private truncateLines() {
        let line = this.lines.pop();
        while (line?.toString()?.trim() === '') {
            line = this.lines.pop();
        }
        if (line != null) {
            this.lines.push(line);
        }
    }
}



function findIndex(arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return i;
        }
    }
    return -1;
}
function difference(arr, arrB) {
    if (arrB == null) {
        return arr;
    }
    return arr.filter(x => arrB.includes(x) === false);
}
