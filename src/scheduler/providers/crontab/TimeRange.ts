import { TimeSlot } from './TimeSlot'
/**
 * @class TimeRange
 * A JavaScript representation of a time range. Each range has a _from_, _to_, and _step_ values.
 *
 * Examples:
 *     var enumm = ['jan','feb','mar','apr',
 *                 'may','jun','jul','aug',
 *                 'sep','oct','nov','dec'];
 *
 *     var slot   = new TimeSlot('Month', 1, 12, enumm);
 *     var range1 = new TimeRange(slot, '* / 2'); // every other month
 *     var range2 = new TimeRange(slot, 'jun - sep'); // every summer
 *
 * @param {TimeSlot} __slot__ The owner time slot object
 * @param {String} __range__ The range string e.g. _* / 2_, _jun - sep_
 */
export class TimeRange {
    slot: TimeSlot;
    from = null;
    to = null;
    step = 1;

    constructor(s: TimeSlot, public range) {

        this.slot = s;
        this.from = null;
        this.to = null;
        this.step = 1;


        this.init();
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
     *             console.log(jobs[i].hour().between(9, 17).render());
     *         }
     *     });
     *
     * @return {String}
     */
    render() {
        var value = '*';
        let { from, slot, to, step } = this;
        if (from > slot.getMin() || to < slot.getMax()) {
            value = from + '-' + to;
        }
        if (step != 1) {
            value += '/' + step;
        }

        return value;
    }
    /**
     * Set the step value for this range.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var jobs = tab.jobs({command:'ls -l /'});
     *         for (var i = 0; i < jobs.length; i++) {
     *             // every other business hour
     *             jobs[i].hour().between(9, 17).every(2);
     *         }
     *     });
     */
    every(value) {
        this.step = parseInt(value);
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
     *             console.log(jobs[i].hour().between(9, 17).toString());
     *         }
     *     });
     *
     * @return {String}
     */
    toString() {
        return this.render();
    }


    /**
     * Converts a string value representing a range limit to an integer.
     *
     * @param {String} __value__ e.g. _5_,_mon_,_jan_
     * @return {Number}
     *
     * @api private
     */
    cleanValue(value) {
        let { slot } = this;
        var sValue = String(value);
        var lValue = sValue.toLowerCase();
        var enummIdx = (slot.getEnum() || []).indexOf(lValue);

        if (enummIdx >= 0) {
            value = enummIdx;
        }

        var iValue = parseInt(value);
        if (iValue >= slot.getMin() && iValue <= slot.getMax()) {
            return iValue
        }

        return null;
    }

    /**
     * Initializes a new TimeRange object.
     *
     * @api private
     */
    init() {

        if (!this.range) {
            this.range = '*';
        }

        if (this.range.indexOf('/') > 0) {
            var tokens = this.range.split('/');

            this.range = tokens[0];
            this.step = tokens[1];
        }

        if (this.range.indexOf('-') > 0) {
            var tokens = this.range.split('-');

            this.from = this.cleanValue(tokens[0]);
            this.to = this.cleanValue(tokens[1]);

            if (this.from == null) {
                throw new Error('Invalid range value ' + tokens[0]);
            }
            else if (this.to == null) {
                throw new Error('Invalid range value ' + tokens[1]);
            }
        }
        else if (this.range === '*') {
            this.from = this.slot.getMin();
            this.to = this.slot.getMax();
        }
        else {
            throw new Error('Unknown time range value ' + this.range);
        }
    }

}

