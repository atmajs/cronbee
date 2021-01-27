/**
 * @class CronComment
 * A JavaScript representation of the inline comment part of a cron job.
 *
 * Examples:
 *     var comment = new CronComment('run this on the weekend');
 *
 * @param {String} __line__
 */
export class CronComment {
    comment: string
    constructor(line: string) {
        this.comment = line;
    }
    /**
     * Returns true if the pattern that was passed matches this comment.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({comment:'run this on the weekend'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // true
     *             console.log(jobs[i].comment().match('run this on the weekend'));
     *         }
     *     });
     *
     * @param {String|RegEx} __pattern__
     * @return {Boolean}
     */
    match(pattern) {
        if (typeof pattern === 'string' && !!~this.comment.indexOf(pattern)) {
            return true;
        }
        if (pattern instanceof RegExp) {
            return pattern.test(this.comment);
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
     *         var jobs = tab.jobs({comment:'run this on the weekend'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].comment().toString());
     *         }
     *     });
     *
     * @return {String}
     */
    toString() {
        return this.comment;
    }
}
