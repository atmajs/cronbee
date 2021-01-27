/**
 * @class CronCommand
 * A JavaScript representation of the command part of a cron job.
 *
 * Examples:
 *     var command = new CronCommand('ls -l /');
 *
 * @param {String} __line__
 */
export class CronCommand {

    command: string
    constructor(line) {
        this.command = line;
    }

    /**
     * Returns true if the pattern that was passed matches this command.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // true
     *             console.log(jobs[i].command().match('ls -l /'));
     *         }
     *     });
     *
     * @param {String|RegEx} __pattern__
     * @return {Boolean}
     */
    match(pattern) {
        if (typeof pattern === 'string' && !!~this.command.indexOf(pattern)) {
            return true;
        }
        if (pattern instanceof RegExp) {
            return pattern.test(this.command);
        }

        return false;
    }
    /**
     * Renders the object to a string as it would be written to the system.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].command().toString());
     *         }
     *     });
     *
     * @return {String}
     */
    toString() {
        return this.command;
    }
}
