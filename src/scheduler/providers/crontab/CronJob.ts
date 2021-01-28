import { CronCommand } from './CronCommand';
import { CronComment } from './CronComment';
import { TimeSlot } from './TimeSlot';

/**
 * Constants
 */
const ITEMREX = /^\s*([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^#\n]*)(\s+#\s*([^\n]*)|$)/;
const SPECREX = /@(\w+)\s([^#\n]*)(\s+#\s*([^\n]*)|$)/;

const SPECIALS = {
    'reboot': '@reboot',
    'hourly': '0 * * * *',
    'daily': '0 0 * * *',
    'weekly': '0 0 * * 0',
    'monthly': '0 0 1 * *',
    'yearly': '0 0 1 1 *',
    'annually': '0 0 1 1 *',
    'midnight': '0 0 * * *'
};

const MONTH_ENUM = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const WEEK_ENUM = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const SINFO = [
    { 'name': 'Minute', 'max': 59, 'min': 0 },
    { 'name': 'Hours', 'max': 23, 'min': 0 },
    { 'name': 'Day of Month', 'max': 31, 'min': 1 },
    { 'name': 'Month', 'max': 12, 'min': 1, 'enumm': MONTH_ENUM },
    { 'name': 'Day of Week', 'max': 7, 'min': 0, 'enumm': WEEK_ENUM },
];

/**
 * Imports
 */

/**
 * @class CronJob
 * A JavaScript representation of a cron job. Each job has exactly 5 time slots as per cron sytax:
 * _minute_, _hour_, _day-of-the-month_, _month_, _day-of-the-week_.
 *
 * Examples:
 *     var job1 = new CronJob('* * * * * ls -l / #comment');
 *     var job2 = new CronJob(null, 'ls -l /', 'comment');
 *
 * @param {String|null} __line__
 * @param {String} __[command]__
 * @param {String} __[comment]__
 */
export class CronJob {

    _command: CronCommand = null;
    _comment: CronComment = null;
    valid = false;
    slots = [];
    special = null;

    constructor(public line, public c, public m) {

        this.init();

    }


    /**
     * Returns true if this cron job is valid.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].isValid());
     *         }
     *     });
     *
     * @return {Boolean}
     */
    isValid() {
        return this.valid;
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
     *             console.log(jobs[i].render());
     *         }
     *     });
     *
     * @return {String}
     */
    render() {
        var time = '';

        if (this.special) {
            time = this.special;
        } else {
            var tokens = [];
            for (var i = 0; i < 5; i++) {
                tokens.push(this.slots[i].toString());
            }
            time = tokens.join(' ');
        }

        var keys = getKeys.call(SPECIALS);
        var vals = getVals.call(SPECIALS);
        var timeIdx = vals.indexOf(time);

        if (timeIdx >= 0) {
            time = '@' + keys[timeIdx];
        }

        var result = time + ' ' + this._command.toString();
        var comment = this._comment.toString();
        if (comment !== '') {
            result += ` #${comment}`;
        }

        return result;
    }
    /**
     * Clears all time slots. Calling this method amounts to setting the time to '* * * * *'.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].clear());
     *         }
     *     });
     */
    clear() {
        this.special = false;

        for (var i = 0; i < this.slots.length; i++) {
            this.slots[i].clear();
        }
    }
    /**
     * Returns the minute time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].minute().render());
     *         }
     *     });
     *
     * @return {TimeSlot}
     */
    minute() {
        return this.slots[0];
    }
    /**
     * Returns the hour time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].hour().render());
     *         }
     *     });
     *
     * @return {TimeSlot}
     */
    hour() {
        return this.slots[1];
    }
    /**
     * Returns the day-of-the-month time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].dom().render());
     *         }
     *     });
     *
     * @return {TimeSlot}
     */
    dom() {
        return this.slots[2];
    }
    /**
     * Returns the month time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].month().render());
     *         }
     *     });
     *
     * @return {TimeSlot}
     */
    month() {
        return this.slots[3];
    }
    /**
     * Returns the day-of-the-week time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].dow().render());
     *         }
     *     });
     *
     * @return {TimeSlot}
     */
    dow() {
        return this.slots[4];
    }
    /**
     * Command getter/setter.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].command('new command'));
     *         }
     *     });
     *
     * @param {String} __[command]__
     * @return {String}
     */
    command(c) {
        if (c) {
            this._command = new CronCommand(c.toString());
        }

        return this._command.toString();
    }
    /**
     * Comment getter/setter.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].comment('new comment'));
     *         }
     *     });
     *
     * @param {String} __[comment]__
     * @return {String}
     */
    comment(c) {
        if (c) {
            this._comment = new CronComment(c.toString());
        }

        return this._comment.toString();
    }
    /**
     * Renders the object to a string as it would be written to the system. See __render__.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].toString());
     *         }
     *     });
     *
     * @return {String}
     */
    toString() {
        return this.render();
    }


    /**
     * Populates the time slots with TimeSlot objects. Call this method ONLY from __init__!
     *
     * @param {Array[String]} __[tokens]__ string tokens to parse
     *
     * @api private
     */
    private setSlots(tokens?) {
        this.slots = [];

        for (var i = 0; i < 5; i++) {
            var info = SINFO[i];
            var value = (tokens && tokens[i] || null);
            var name = info.name;
            var min = info.min;
            var max = info.max;
            var enumm = info.enumm;
            var slot = new TimeSlot(name, min, max, enumm, value);

            this.slots.push(slot);
        }
    }
    /**
     * Initializes a new CronJob object.
     *
     * @api private
     */
    private init() {
        this.setSlots();

        if (this.line) {
            var result = this.line.match(ITEMREX);

            if (result && result.length > 0) {
                this._command = new CronCommand(result[6]);
                this._comment = new CronComment(result[8] || '');
                this.valid = true;

                this.setSlots(result.slice(1, 6));
            }
            else if (this.line.indexOf('@') < this.line.indexOf('#') || this.line.indexOf('#') == -1) {
                var result = this.line.match(SPECREX);

                if (result && result.length > 0 && SPECIALS[result[1]]) {
                    this._command = new CronCommand(result[2]);
                    this._comment = new CronComment(result[4] || '');

                    var value = SPECIALS[result[1]];
                    if (value.indexOf('@') >= 0) {
                        this.special = value;
                    }
                    else {
                        this.setSlots(value.split(' '));
                    }
                    this.valid = true;
                }
            }
        }
        else if (this.c) {
            this.valid = true;
            this._command = new CronCommand(this.c && this.c.toString() || '');
            this._comment = new CronComment(this.m && this.m.toString() || '');
        }
        else {
            throw new Error('Expected either a canonical crontab line or a command string');
        }
    }

    static toModel (job: CronJob) {
        return {
            name: job._comment?.comment || job.line,
            enabled: true,
            command: job._command?.command,
        };
    }

}

/* @api private */
function getKeys() {
    return Object.keys(this);
}

function getVals() {
    var keys = getKeys.call(this);
    var vals = [];

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        vals.push(this[key]);
    }

    return vals;
}

