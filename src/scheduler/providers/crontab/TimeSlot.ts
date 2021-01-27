/**
 * Imports
 */

import { TimeRange } from './TimeRange';


/**
 * @class TimeSlot
 * A JavaScript representation of a time slot (e.g. minute, hour, month). Each slot has zero or
 * more time ranges coresponding to the comma separated list in the cron sytax
 * (e.g. _* / 4_, _10_, 5-15/2).
 *
 * Examples:
 *     var enumm = ['jan','feb','mar','apr',
 *                 'may','jun','jul','aug',
 *                 'sep','oct','nov','dec'];
 *
 *     var slot1 = new TimeSlot('Month', 1, 12, enumm);
 *     var slot2 = new TimeSlot('Minute', 0, 59, null, '');
 *
 * @param {String} __name__ (e.g 'Minute', 'Month')
 * @param {Number} __min__ minimum value
 * @param {Number} __max__ maximum value
 * @param {Object|null} __enumm__ an object enumerating all possible values
 * @param {String|null} __value__ a value to parse (e.g '19-0/2,0-3')
 */
export class TimeSlot {

    parts = [];

    constructor(public name: string, public min: number, public max: number, public enumm, public value) {
        this.init();
    }


    /**
     * Returns the minimum value for this time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].month().getMin());
     *         }
     *     });
     *
     * @return {Number}
     */
    getMin() {
        return this.min;
    }
    /**
     * Returns the maximum value for this time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].month().getMax());
     *         }
     *     });
     *
     * @return {Number}
     */
    getMax() {
        return this.max;
    }
    /**
     * Returns the allowed value enumeration for this time slot.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].month().getEnum());
     *         }
     *     });
     *
     * @return {Object}
     */
    getEnum() {
        return this.enumm;
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
     *             console.log(jobs[i].month().render());
     *         }
     *     });
     *
     * @return {Object}
     */
    render() {
        return this.parts.map(function (part) {
            return part.toString();
        }).join(',') || '*';
    }
    /**
     * Set this time slot to repeat every n units e.g. _* / n_
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // every other month
     *             jobs[i].month().every(2);
     *         }
     *     });
     *
     * @param {Number} __number__
     * @return {TimeRange}
     */
    every(n) {
        try {
            var range = new TimeRange(this, '*/' + parseInt(n));
            this.parts.push(range);

            return range;
        }
        catch (e) { }

        return null;
    }
    /**
     * Set this time slot to repeat exactly at the specified values e.g. _0,12_
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // at midnight and noon
     *             jobs[i].hour().on(0, 12);
     *             jobs[i].minute().on(0);
     *         }
     *     });
     *
     * @param {Number} __value+__ one or more values
     * @return {TimeRange}
     */
    on(...args) {
        for (var i = 0; i < args.length; i++) {
            this.parts.push(args[i]);
        }
    }
    /**
     * Set this time slot to repeat exactly at the specified values e.g. _0,12_
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // at midnight and noon
     *             jobs[i].hour().on(0, 12);
     *             jobs[i].minute().on(0);
     *         }
     *     });
     *
     * @param {Number} __value+__ one or more values
     * @return {TimeRange}
     */
    at(...args) { return this.on(...args); }
    in(...args) { return this.on(...args); }
    /**
     * Set this time slot to repeat between from and to e.g. _from - to_
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // business hours
     *             jobs[i].hour().between(9, 17);
     *         }
     *     });
     *
     * @param {Number} __from__
     * @param {Number} __to__
     * @return {TimeRange}
     */
    between(from, to) {
        try {
            var range = new TimeRange(this, from + '-' + to);
            this.parts.push(range);

            return range;
        }
        catch (e) { }

        return null;
    }
    /**
     * Clears this time slot. Calling this method amounts to setting the slot to '*'.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             console.log(jobs[i].month().clear());
     *         }
     *     });
     */
    clear() {
        this.parts = [];
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
     *             console.log(jobs[i].month().toString());
     *         }
     *     });
     *
     * @return {String}
     */
    toString() {
        return this.render();
    }


    /**
     * Initializes a new TimeSlot object.
     *
     * @api private
     */
    init() {
        if (this.value) {
            var tokens = this.value.split(',');
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];

                if (token.indexOf('/') > 0 || token.indexOf('-') > 0 || token == '*') {
                    var range = new TimeRange(this, token);
                    this.parts.push(range);
                }
                else {
                    var lPart = token.toLowerCase();
                    var enummIdx = (this.enumm || []).indexOf(lPart);

                    if (enummIdx >= 0) {
                        token = enummIdx;
                    }

                    var iPart = parseInt(token);
                    if (iPart !== iPart) {
                        throw new Error('Unknown cron time part for ' + this.name + ': ' + token);
                    }

                    this.parts.push(iPart);
                }
            }
        }
    }

}


