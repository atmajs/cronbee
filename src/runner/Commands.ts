import alot from 'alot';
import appcfg from 'appcfg'
import { File } from 'atma-io';
import { Scheduler } from '../scheduler/Scheduler';
import { ICreateJob } from '../models/IJob';

const PREFIX = 'cronbee';

export const Commands = {
    async list (args: string[]) {

        let cfg = await appcfg.fetch([]);
        let prefix = cfg.prefix ?? PREFIX
        let jobs = await Jobs.load(prefix);

        if (jobs.length) {
            console.log(jobs);
        } else {
            console.log(`Still no tasks with prefix: ${prefix}`);
        }
    },
    async clear (args: string[]) {
        let cronbee = new Scheduler();
        let currentJobs = await Jobs.load(PREFIX);

        // clear
        await alot(currentJobs)
            .forEachAsync(async job => {
                await cronbee.remove({ taskName: job.name })
            })
            .toArrayAsync({ threads: 1 });

        console.log(`Removed ${currentJobs.length}`, currentJobs.map(x => x.name));
    },
    async ensure (args: string[]) {
        let file = args.find(str => /\w+\.\w+$/g.test(str)) ?? 'cronbee.json';
        let exists = await File.existsAsync(file);
        if (exists === false) {
            console.error(`Config file "${file}" not found`);
            return;
        }
        let config = await File.readAsync<any>(file);
        if (config == null || typeof config === 'string') {
            console.error(`Config from "${file}" is not resolved to Object`);
            return;
        }
        let jobs = null as ICreateJob[]

        if (Array.isArray(config)) {
            jobs = config;
        } else if (Array.isArray(config.tasks)) {
            jobs = config.tasks;
        }

        if (Array.isArray(jobs) === false) {
            console.error(`Config should be array of jobs, or contains property "tasks" as array of jobs`);
            return;
        }

        for (let job of jobs) {
            if (!job.taskName || !job.taskRun || !(job.cron || job.schtaskFlags)) {
                console.error(`Job is invalid. Should contain: name, command, cron || schtaskFlags`);
                console.log(job);
                return;
            }
        }

        let cronbee = new Scheduler();
        let currentJobs = await Jobs.load(PREFIX);

        // clear
        await alot(currentJobs)
            .forEachAsync(async job => {
                await cronbee.remove({ taskName: job.name })
            })
            .toArrayAsync({ threads: 1 });

        // add
        let created = await alot(jobs)
            .mapAsync(async job => {

                let name = job
                    .taskName
                    .replace(/[^\w\_]/g, '_')
                    .replace(/[_]{2,}/g, '_')
                    .toLowerCase()

                return await cronbee.ensure({
                    taskName: `${PREFIX}\\${name}`,
                    taskRun: job.taskRun,
                    cron: job.cron,
                    schtaskFlags: job.schtaskFlags,
                    workingDirectory: job.workingDirectory
                })
            })
            .toArrayAsync({ threads: 1 });

        console.log(`Tasks ${created.length}: `, created);
    }
}


namespace Jobs {
    export async function load (prefix) {
        let jobs = await new Scheduler().load();
        let rgx = new RegExp(`^${ prefix }\\\\`);

        return jobs.filter(x => rgx.test(x.name));
    }
}
