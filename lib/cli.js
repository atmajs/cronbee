
// source ./RootModule.js
(function(){
	
	var _src_runner_Commands = {};
var _src_runner_Runner = {};
var _src_scheduler_Scheduler = {};
var _src_scheduler_providers_crontab_CronCommand = {};
var _src_scheduler_providers_crontab_CronComment = {};
var _src_scheduler_providers_crontab_CronJob = {};
var _src_scheduler_providers_crontab_CronTab = {};
var _src_scheduler_providers_crontab_CronTabLib = {};
var _src_scheduler_providers_crontab_CronVar = {};
var _src_scheduler_providers_crontab_TimeRange = {};
var _src_scheduler_providers_crontab_TimeSlot = {};
var _src_scheduler_providers_schtasks_SchtasksLib = {};
var _src_shell_ShellUtil = {};
var _src_utils_CommandUtil = {};
var _src_utils_CsvUtil = {};

// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronCommand;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronCommand = void 0;
/**
 * @class CronCommand
 * A JavaScript representation of the command part of a cron job.
 *
 * Examples:
 *     var command = new CronCommand('ls -l /');
 *
 * @param {String} __line__
 */
var CronCommand = /** @class */ (function () {
    function CronCommand(line) {
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
    CronCommand.prototype.match = function (pattern) {
        if (typeof pattern === 'string' && !!~this.command.indexOf(pattern)) {
            return true;
        }
        if (pattern instanceof RegExp) {
            return pattern.test(this.command);
        }
        return false;
    };
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
    CronCommand.prototype.toString = function () {
        return this.command;
    };
    return CronCommand;
}());
exports.CronCommand = CronCommand;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronCommand) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronCommand, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronCommand = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronComment;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronComment = void 0;
/**
 * @class CronComment
 * A JavaScript representation of the inline comment part of a cron job.
 *
 * Examples:
 *     var comment = new CronComment('run this on the weekend');
 *
 * @param {String} __line__
 */
var CronComment = /** @class */ (function () {
    function CronComment(line) {
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
    CronComment.prototype.match = function (pattern) {
        if (typeof pattern === 'string' && !!~this.comment.indexOf(pattern)) {
            return true;
        }
        if (pattern instanceof RegExp) {
            return pattern.test(this.comment);
        }
        return false;
    };
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
    CronComment.prototype.toString = function () {
        return this.comment;
    };
    return CronComment;
}());
exports.CronComment = CronComment;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronComment) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronComment, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronComment = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_TimeRange;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeRange = void 0;
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
var TimeRange = /** @class */ (function () {
    function TimeRange(s, range) {
        this.range = range;
        this.from = null;
        this.to = null;
        this.step = 1;
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
    TimeRange.prototype.render = function () {
        var value = '*';
        var _a = this, from = _a.from, slot = _a.slot, to = _a.to, step = _a.step;
        if (from > slot.getMin() || to < slot.getMax()) {
            value = from + '-' + to;
        }
        if (step != 1) {
            value += '/' + step;
        }
        return value;
    };
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
    TimeRange.prototype.every = function (value) {
        this.step = parseInt(value);
    };
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
    TimeRange.prototype.toString = function () {
        return this.render();
    };
    /**
     * Converts a string value representing a range limit to an integer.
     *
     * @param {String} __value__ e.g. _5_,_mon_,_jan_
     * @return {Number}
     *
     * @api private
     */
    TimeRange.prototype.cleanValue = function (value) {
        var slot = this.slot;
        var sValue = String(value);
        var lValue = sValue.toLowerCase();
        var enummIdx = (slot.getEnum() || []).indexOf(lValue);
        if (enummIdx >= 0) {
            value = enummIdx;
        }
        var iValue = parseInt(value);
        if (iValue >= slot.getMin() && iValue <= slot.getMax()) {
            return iValue;
        }
        return null;
    };
    /**
     * Initializes a new TimeRange object.
     *
     * @api private
     */
    TimeRange.prototype.init = function () {
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
    };
    return TimeRange;
}());
exports.TimeRange = TimeRange;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_TimeRange) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_TimeRange, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_TimeRange = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_TimeSlot;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
/**
 * Imports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlot = void 0;
var TimeRange_1 = _src_scheduler_providers_crontab_TimeRange;
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
var TimeSlot = /** @class */ (function () {
    function TimeSlot(name, min, max, enumm, value) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.enumm = enumm;
        this.value = value;
        this.parts = [];
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
    TimeSlot.prototype.getMin = function () {
        return this.min;
    };
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
    TimeSlot.prototype.getMax = function () {
        return this.max;
    };
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
    TimeSlot.prototype.getEnum = function () {
        return this.enumm;
    };
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
    TimeSlot.prototype.render = function () {
        return this.parts.map(function (part) {
            return part.toString();
        }).join(',') || '*';
    };
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
    TimeSlot.prototype.every = function (n) {
        try {
            var range = new TimeRange_1.TimeRange(this, '*/' + parseInt(n));
            this.parts.push(range);
            return range;
        }
        catch (e) { }
        return null;
    };
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
    TimeSlot.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            this.parts.push(args[i]);
        }
    };
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
    TimeSlot.prototype.at = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.on.apply(this, args);
    };
    TimeSlot.prototype.in = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.on.apply(this, args);
    };
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
    TimeSlot.prototype.between = function (from, to) {
        try {
            var range = new TimeRange_1.TimeRange(this, from + '-' + to);
            this.parts.push(range);
            return range;
        }
        catch (e) { }
        return null;
    };
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
    TimeSlot.prototype.clear = function () {
        this.parts = [];
    };
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
    TimeSlot.prototype.toString = function () {
        return this.render();
    };
    /**
     * Initializes a new TimeSlot object.
     *
     * @api private
     */
    TimeSlot.prototype.init = function () {
        if (this.value) {
            var tokens = this.value.split(',');
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                if (token.indexOf('/') > 0 || token.indexOf('-') > 0 || token == '*') {
                    var range = new TimeRange_1.TimeRange(this, token);
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
    };
    return TimeSlot;
}());
exports.TimeSlot = TimeSlot;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_TimeSlot) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_TimeSlot, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_TimeSlot = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronJob;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJob = void 0;
var CronCommand_1 = _src_scheduler_providers_crontab_CronCommand;
var CronComment_1 = _src_scheduler_providers_crontab_CronComment;
var TimeSlot_1 = _src_scheduler_providers_crontab_TimeSlot;
/**
 * Constants
 */
var ITEMREX = /^\s*([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^@#\s]+)\s+([^#\n]*)(\s+#\s*([^\n]*)|$)/;
var SPECREX = /@(\w+)\s([^#\n]*)(\s+#\s*([^\n]*)|$)/;
var SPECIALS = {
    'reboot': '@reboot',
    'hourly': '0 * * * *',
    'daily': '0 0 * * *',
    'weekly': '0 0 * * 0',
    'monthly': '0 0 1 * *',
    'yearly': '0 0 1 1 *',
    'annually': '0 0 1 1 *',
    'midnight': '0 0 * * *'
};
var MONTH_ENUM = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
var WEEK_ENUM = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
var SINFO = [
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
var CronJob = /** @class */ (function () {
    function CronJob(line, c, m) {
        this.line = line;
        this.c = c;
        this.m = m;
        this._command = null;
        this._comment = null;
        this.valid = false;
        this.slots = [];
        this.special = null;
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
    CronJob.prototype.isValid = function () {
        return this.valid;
    };
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
    CronJob.prototype.render = function () {
        var time = '';
        if (this.special) {
            time = this.special;
        }
        else {
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
            result += " #" + comment;
        }
        return result;
    };
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
    CronJob.prototype.clear = function () {
        this.special = false;
        for (var i = 0; i < this.slots.length; i++) {
            this.slots[i].clear();
        }
    };
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
    CronJob.prototype.minute = function () {
        return this.slots[0];
    };
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
    CronJob.prototype.hour = function () {
        return this.slots[1];
    };
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
    CronJob.prototype.dom = function () {
        return this.slots[2];
    };
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
    CronJob.prototype.month = function () {
        return this.slots[3];
    };
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
    CronJob.prototype.dow = function () {
        return this.slots[4];
    };
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
    CronJob.prototype.command = function (c) {
        if (c) {
            this._command = new CronCommand_1.CronCommand(c.toString());
        }
        return this._command.toString();
    };
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
    CronJob.prototype.comment = function (c) {
        if (c) {
            this._comment = new CronComment_1.CronComment(c.toString());
        }
        return this._comment.toString();
    };
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
    CronJob.prototype.toString = function () {
        return this.render();
    };
    /**
     * Populates the time slots with TimeSlot objects. Call this method ONLY from __init__!
     *
     * @param {Array[String]} __[tokens]__ string tokens to parse
     *
     * @api private
     */
    CronJob.prototype.setSlots = function (tokens) {
        this.slots = [];
        for (var i = 0; i < 5; i++) {
            var info = SINFO[i];
            var value = (tokens && tokens[i] || null);
            var name = info.name;
            var min = info.min;
            var max = info.max;
            var enumm = info.enumm;
            var slot = new TimeSlot_1.TimeSlot(name, min, max, enumm, value);
            this.slots.push(slot);
        }
    };
    /**
     * Initializes a new CronJob object.
     *
     * @api private
     */
    CronJob.prototype.init = function () {
        this.setSlots();
        if (this.line) {
            var result = this.line.match(ITEMREX);
            if (result && result.length > 0) {
                this._command = new CronCommand_1.CronCommand(result[6]);
                this._comment = new CronComment_1.CronComment(result[8] || '');
                this.valid = true;
                this.setSlots(result.slice(1, 6));
            }
            else if (this.line.indexOf('@') < this.line.indexOf('#') || this.line.indexOf('#') == -1) {
                var result = this.line.match(SPECREX);
                if (result && result.length > 0 && SPECIALS[result[1]]) {
                    this._command = new CronCommand_1.CronCommand(result[2]);
                    this._comment = new CronComment_1.CronComment(result[4] || '');
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
            this._command = new CronCommand_1.CronCommand(this.c && this.c.toString() || '');
            this._comment = new CronComment_1.CronComment(this.m && this.m.toString() || '');
        }
        else {
            throw new Error('Expected either a canonical crontab line or a command string');
        }
    };
    CronJob.toModel = function (job) {
        var _a, _b;
        return {
            name: ((_a = job._comment) === null || _a === void 0 ? void 0 : _a.comment) || job.line,
            enabled: true,
            command: (_b = job._command) === null || _b === void 0 ? void 0 : _b.command,
        };
    };
    return CronJob;
}());
exports.CronJob = CronJob;
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronJob) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronJob, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronJob = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_shell_ShellUtil;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellUtil = void 0;
var child_process_1 = require("child_process");
var ShellUtil;
(function (ShellUtil) {
    function exec(command, args) {
        return new Promise(function (resolve, reject) {
            var stdout = '';
            var stderr = '';
            var child = child_process_1.spawn(command, args);
            child.stdout.setEncoding('utf8');
            child.stderr.setEncoding('utf8');
            child.stdout.on('data', function (chunk) {
                stdout += chunk;
            });
            child.stderr.on('data', function (chunk) {
                stderr += chunk;
            });
            child.on('error', function (err) {
                reject(err);
            });
            child.on('close', function (code) {
                resolve({ code: code, stderr: stderr, stdout: stdout });
            });
        });
    }
    ShellUtil.exec = exec;
})(ShellUtil = exports.ShellUtil || (exports.ShellUtil = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_shell_ShellUtil) && isObject(module.exports)) {
		Object.assign(_src_shell_ShellUtil, module.exports);
		return;
	}
	_src_shell_ShellUtil = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronVar;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronVar = void 0;
/**
 * Constants
 */
var ITEMREX = /^(\S+)=(.+)$/;
/**
 * @class CronVar
 * A JavaScript representation of a cron environment variable.
 *
 * Examples:
 *     var env = new CronVar('MAIL=user@domain.org');
 *
 * @param {String} __line__
 */
var CronVar = /** @class */ (function () {
    function CronVar(line) {
        this.line = line;
        this._name = null;
        this._val = null;
        this.valid = false;
        /**
         * Renders the object to a string as it would be written to the system.
         *
         * Examples:
         *     new CronTab(function(err, tab) {
         *         if (err) { console.log(err); process.exit(1); }
         *
         *         var vars = tab.vars({name:'MAIL'});
         *         for (var i = 0; i < vars.length; i++) {
         *             console.log(vars[i].render());
         *         }
         *     });
         *
         * @return {String}
         */
        this.render = function () {
            return this.name + '=' + this.val;
        };
        /**
         * Comment getter/setter.
         *
         * Examples:
         *     new CronTab(function(err, tab) {
         *         if (err) { console.log(err); process.exit(1); }
         *
         *         var vars = tab.vars({name:'MAIL'});
         *         for (var i = 0; i < vars.length; i++) {
         *             console.log(vars[i].name('PATH'));
         *         }
         *     });
         *
         * @param {String} __[name]__
         * @return {String}
         */
        this.name = function (c) {
            if (c) {
                this._name = '' + c;
            }
            return this._name;
        };
        this.init();
    }
    /**
     * Returns true if this env variable is valid.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var vars = tab.vars({name:'MAIL'});
     *         for (var i = 0; i < vars.length; i++) {
     *             console.log(vars[i].isValid());
     *         }
     *     });
     *
     * @return {Boolean}
     */
    CronVar.prototype.isValid = function () {
        return this.valid;
    };
    /**
     * Comment getter/setter.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var vars = tab.vars({name:'MAIL'});
     *         for (var i = 0; i < vars.length; i++) {
     *             console.log(vars[i].val('user@domain.org'));
     *         }
     *     });
     *
     * @param {String} __[val]__
     * @return {String}
     */
    CronVar.prototype.val = function (c) {
        if (c) {
            this._val = '' + c;
        }
        return this._val;
    };
    /**
     * Renders the object to a string as it would be written to the system. See __render__.
     *
     * Examples:
     *     new CronTab(function(err, tab) {
     *         if (err) { console.log(err); process.exit(1); }
     *
     *         var vars = tab.vars({name:'MAIL'});
     *         for (var i = 0; i < vars.length; i++) {
     *             console.log(vars[i].toString());
     *         }
     *     });
     *
     * @return {String}
     */
    CronVar.prototype.toString = function () {
        return this.render();
    };
    /**
     * Initializes a new CronVar object.
     *
     * @api private
     */
    CronVar.prototype.init = function () {
        var tokens = (this.line || '').match(ITEMREX);
        if (tokens && tokens.length > 0) {
            this._name = tokens[1];
            this._val = tokens[2];
            this.valid = true;
        }
        else {
            throw new Error('Expected an env variable declaration line');
        }
    };
    return CronVar;
}());
exports.CronVar = CronVar;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronVar) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronVar, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronVar = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronTab;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronTab = void 0;
var child_process_1 = require("child_process");
var ShellUtil_1 = _src_shell_ShellUtil;
var CronJob_1 = _src_scheduler_providers_crontab_CronJob;
var CronVar_1 = _src_scheduler_providers_crontab_CronVar;
var COMMAND = 'crontab';
var CronTab = /** @class */ (function () {
    function CronTab(username, cb) {
        var _a;
        this.backup = { lines: [], jobs: [], vars: [] };
        this.lines = [];
        this._jobs = [];
        this._vars = [];
        this.user = username || null;
        this.root = !((_a = process.getuid) === null || _a === void 0 ? void 0 : _a.call(process));
        this.load(cb);
    }
    CronTab.prototype.jobs = function (options) {
        if (!options) {
            return this._jobs.slice();
        }
        if (!options.command && !options.comment) {
            return this._jobs.slice();
        }
        var queries = Object.keys(options);
        if (queries.filter(function (x) { return x !== 'comment' && x !== 'command'; }).length > 0) {
            return [];
        }
        var results = [];
        for (var i = 0; i < this._jobs.length; i++) {
            var job = this._jobs[i];
            var match = true;
            for (var j = 0; j < queries.length; j++) {
                var query = queries[j];
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
    };
    CronTab.prototype.find = function (options) { return this.jobs(options); };
    ;
    CronTab.prototype.vars = function (options) {
        if (typeof options === 'string') {
            options = { name: options };
        }
        var results = [];
        var queries = Object.keys(options);
        if (queries.length < 1) {
            results = this._vars.slice();
        }
        else if (queries.filter(function (x) { return x !== 'name' && x !== 'val'; }).length == 0) {
            for (var i = 0; i < this._vars.length; i++) {
                var env = this._vars[i];
                var match = true;
                for (var j = 0; j < queries.length; j++) {
                    var query = queries[j];
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
        var self = this;
        results.add = function (name, val) {
            var pairs = {};
            if (typeof name === 'string' && typeof val === 'string') {
                pairs[name] = val;
            }
            else if (typeof name === 'object' && name != null) {
                pairs = Object.assign({}, name);
            }
            var insertIndex = findIndex(self.lines, function (val) {
                return val instanceof CronJob_1.CronJob;
            });
            if (insertIndex < 0) {
                insertIndex = 0;
            }
            for (name in pairs) {
                var val_1 = pairs[name];
                var env = new CronVar_1.CronVar(name + '=' + val_1);
                self.lines.splice(insertIndex++, 0, env);
                self._vars.push(env);
            }
        };
        results.rm = function () {
            self.lines = difference(self.lines, results);
            self._vars = difference(self._vars, results);
            results.splice(0, results.length);
        };
        results.val = function (a) {
            return results.length && results[0].val();
        };
        return results;
    };
    CronTab.prototype.save = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            function cb(err, self) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(self);
            }
            var stdout = '';
            var stderr = '';
            var _a = _this.makeChildCommand('save'), command = _a.command, args = _a.args;
            var child = child_process_1.spawn(command, args);
            var self = _this;
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
            var body = _this.render();
            child.stdin.write(body);
            child.stdin.end();
        });
    };
    CronTab.prototype.render = function () {
        var tokens = [];
        for (var i = 0; i < this.lines.length; i++) {
            var job = this.lines[i];
            if (typeof job !== 'string' && !job.isValid()) {
                tokens.push('# ' + job.toString());
                continue;
            }
            tokens.push(job.toString());
        }
        return tokens.join('\n').trim() + '\n';
    };
    CronTab.prototype.create = function (command, when, taskName) {
        if (when && typeof when !== 'string' && (when instanceof Date) === false) {
            return null;
        }
        command = command.trim();
        taskName = taskName.trim();
        var job = null;
        if (typeof when === 'string') {
            job = this.makeJob(when + ' ' + command + ' #' + taskName);
        }
        else {
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
    };
    /**
     * Parses a raw crontab line and returns a CronJob object
     *
     * @param {String} __line__
     * @return {CronJob|null}
     */
    CronTab.prototype.parse = function (line) {
        return this.makeJob(line);
    };
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
    CronTab.prototype.remove = function (job) {
        this.removeInner(job);
        this.truncateLines();
    };
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
    CronTab.prototype.reset = function () {
        this.lines = this.backup.lines.slice();
        this._jobs = this.backup.jobs.slice();
        this._vars = this.backup.vars.slice();
    };
    CronTab.prototype.load = function (cb) {
        var _this = this;
        var stdout = '';
        var stderr = '';
        var _a = this.makeChildCommand('load'), command = _a.command, args = _a.args;
        this.lines = [];
        this._jobs = [];
        this._vars = [];
        ShellUtil_1.ShellUtil
            .exec(command, args)
            .then(function (_a) {
            var code = _a.code, stdout = _a.stdout, stderr = _a.stderr;
            if (code != 0 && stderr.indexOf('no crontab for ') < 0) {
                cb(new Error(stderr), null);
                return;
            }
            var tokens = stdout.split('\n');
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                var job = _this.makeJob(token);
                var env = _this.makeVar(token);
                if (job != null && job.isValid()) {
                    _this._jobs.push(job);
                    _this.lines.push(job);
                }
                else if (env != null && env.isValid()) {
                    _this._vars.push(env);
                    _this.lines.push(env);
                }
                else {
                    _this.lines.push(token);
                }
            }
            _this.truncateLines();
            _this.backup.lines = _this.lines.slice();
            _this.backup.jobs = _this._jobs.slice();
            _this.backup.vars = _this._vars.slice();
            cb(null, _this);
        }, function (error) {
            cb(error);
        });
    };
    CronTab.prototype.removeInner = function (job) {
        var oldJobs = this._jobs;
        var oldLines = this.lines;
        this._jobs = [];
        this.lines = [];
        for (var i = 0; i < oldJobs.length; i++) {
            var oldJob = oldJobs[i];
            if (oldJob !== job) {
                this._jobs.push(oldJob);
            }
        }
        for (var i = 0; i < oldLines.length; i++) {
            var oldLine = oldLines[i];
            if (oldLine !== job) {
                this.lines.push(oldLine);
            }
        }
    };
    /**
     * Creates a system command string to run crontab. Intended to be passed to
     * child_process.spawn. If this is going to run for another user and the
     * current user is not root, we prefix the command with sudo.
     *
     * @api private
     */
    CronTab.prototype.makeChildCommand = function (action) {
        var command = COMMAND;
        if (this.user && this.root === false) {
            command = 'sudo ' + command;
        }
        var args = [];
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
            command = "wsl";
        }
        return { command: command, args: args };
    };
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
    CronTab.prototype.makeJob = function (line, command, comment) {
        try {
            var job = new CronJob_1.CronJob(line, command, comment);
            if (!job || !job.isValid()) {
                throw new Error('invalid job');
            }
            return job;
        }
        catch (e) { }
        return null;
    };
    /**
     * Creates a new job. This method exists to catch instantiation exceptions.
     * @see CronJob
     *
     * @param {String} __line__
     *
     * @api private
     */
    CronTab.prototype.makeVar = function (line) {
        try {
            var env = new CronVar_1.CronVar(line);
            if (!env || !env.isValid()) {
                throw new Error('invalid env variable');
            }
            return env;
        }
        catch (e) { }
        return null;
    };
    /**
     * Compacts the line collection by removes empty lines from the end.
     *
     * @api private
     */
    CronTab.prototype.truncateLines = function () {
        var _a;
        var line = this.lines.pop();
        while (((_a = line === null || line === void 0 ? void 0 : line.toString()) === null || _a === void 0 ? void 0 : _a.trim()) === '') {
            line = this.lines.pop();
        }
        if (line != null) {
            this.lines.push(line);
        }
    };
    return CronTab;
}());
exports.CronTab = CronTab;
function findIndex(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
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
    return arr.filter(function (x) { return arrB.includes(x) === false; });
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronTab) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronTab, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronTab = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_crontab_CronTabLib;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronTabLib = void 0;
var memd_1 = require("memd");
var CronJob_1 = _src_scheduler_providers_crontab_CronJob;
var CronTab_1 = _src_scheduler_providers_crontab_CronTab;
var CronTabLib = /** @class */ (function () {
    function CronTabLib() {
    }
    CronTabLib.prototype.load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var crontab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CronTabLoader.load()];
                    case 1:
                        crontab = _a.sent();
                        return [2 /*return*/, crontab._jobs.map(function (job) {
                                return CronJob_1.CronJob.toModel(job);
                            })];
                }
            });
        });
    };
    CronTabLib.prototype.ensure = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var crontab, job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!params.cron) {
                            throw new Error("To use crontab provide the cron pattern");
                        }
                        return [4 /*yield*/, CronTabLoader.load()];
                    case 1:
                        crontab = _a.sent();
                        job = crontab._jobs.find(function (x) { var _a; return ((_a = x._comment) === null || _a === void 0 ? void 0 : _a.comment) === params.taskName; });
                        if (job != null) {
                            return [2 /*return*/, CronJob_1.CronJob.toModel(job)];
                        }
                        job = crontab.create(params.taskRun, params.cron, params.taskName);
                        return [4 /*yield*/, crontab.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, CronJob_1.CronJob.toModel(job)];
                }
            });
        });
    };
    CronTabLib.prototype.remove = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var crontab, job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CronTabLoader.load()];
                    case 1:
                        crontab = _a.sent();
                        job = crontab._jobs.find(function (x) { var _a; return ((_a = x._comment) === null || _a === void 0 ? void 0 : _a.comment) === params.taskName; });
                        if (job == null) {
                            throw new Error("\"" + params.taskName + "\" not found");
                        }
                        crontab.remove(job);
                        return [4 /*yield*/, crontab.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    return CronTabLib;
}());
exports.CronTabLib = CronTabLib;
;
var CronTabLoader = /** @class */ (function () {
    function CronTabLoader() {
    }
    CronTabLoader.load = function (user) {
        return new Promise(function (resolve, reject) {
            function cb(err, crontab) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(crontab);
            }
            if (typeof user === 'string') {
                new CronTab_1.CronTab(user, cb);
                return;
            }
            new CronTab_1.CronTab('', cb);
        });
    };
    __decorate([
        memd_1.default.deco.memoize()
    ], CronTabLoader, "load", null);
    return CronTabLoader;
}());
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_crontab_CronTabLib) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_crontab_CronTabLib, module.exports);
		return;
	}
	_src_scheduler_providers_crontab_CronTabLib = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_CsvUtil;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvUtil = void 0;
var CsvUtil;
(function (CsvUtil) {
    function parse(str, delimiterChar) {
        var _a;
        var arr = [];
        var valueStart = 0;
        var quote = 34; //'"';
        var delimiter = (_a = delimiterChar === null || delimiterChar === void 0 ? void 0 : delimiterChar.charCodeAt(0)) !== null && _a !== void 0 ? _a : 44; //',';
        var row = [];
        var state = State.row;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c === quote) {
                if (state === State.row) {
                    // starts
                    valueStart = i + 1;
                    state = State.valueQuoted;
                    continue;
                }
                if (state === State.valueQuoted) {
                    // ends
                    row.push(str.substring(valueStart, i));
                    state = State.row;
                    continue;
                }
            }
            if (c === 10 /*'\n'*/ || c === 13 /*'\r'*/) {
                if (state === State.row) {
                    if (row.length > 0) {
                        arr.push(row);
                        row = [];
                        continue;
                    }
                }
            }
            if (c === delimiter) {
                if (state === State.valueSimple) {
                    // ends
                    row.push(str.substring(valueStart, i));
                    state = State.row;
                    continue;
                }
                continue;
            }
            if (c === 92 /* \ */) {
                i++;
                continue;
            }
            if (state === State.row && c > 32) {
                valueStart = i;
                state = State.valueSimple;
                continue;
            }
        }
        if (state === State.valueSimple) {
            row.push(str.substring(valueStart));
            state = State.row;
        }
        if (row.length) {
            arr.push(row);
        }
        return arr;
    }
    CsvUtil.parse = parse;
})(CsvUtil = exports.CsvUtil || (exports.CsvUtil = {}));
var State;
(function (State) {
    State[State["row"] = 0] = "row";
    State[State["valueQuoted"] = 1] = "valueQuoted";
    State[State["valueSimple"] = 2] = "valueSimple";
})(State || (State = {}));
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_CsvUtil) && isObject(module.exports)) {
		Object.assign(_src_utils_CsvUtil, module.exports);
		return;
	}
	_src_utils_CsvUtil = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_providers_schtasks_SchtasksLib;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchtasksLib = void 0;
var shellbee_1 = require("shellbee");
var CsvUtil_1 = _src_utils_CsvUtil;
/**
 * https://docs.microsoft.com/de-de/windows-server/administration/windows-commands/schtasks-create
 */
var SchtasksLib = /** @class */ (function () {
    function SchtasksLib() {
    }
    SchtasksLib.prototype.load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var shell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shellbee_1.Shell.run({
                            silent: true,
                            command: "schtasks /query /fo CSV /nh"
                        })];
                    case 1:
                        shell = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                shell.onComplete(function (shell) {
                                    var table = CsvUtil_1.CsvUtil.parse(shell.stdout.join(''));
                                    var jobs = table.map(function (row) {
                                        return {
                                            name: row[0].replace(/^\\/, ''),
                                            path: row[0],
                                            nextRun: row[1] === 'N/A' ? null : new Date(row[1]),
                                            enabled: row[2] === 'Ready',
                                        };
                                    });
                                    resolve(jobs);
                                });
                            })];
                }
            });
        });
    };
    SchtasksLib.prototype.ensure = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var args, command, shell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!params.schtaskFlags) {
                            throw new Error("To use schtasks provide cli time flags, e.g. \"schtaskFlags\": \"/sc daily /st 12:00\"");
                        }
                        args = [
                            "/f",
                            "/tn \"" + params.taskName + "\"",
                            "/tr \"cmd /C " + params.taskRun + "\"",
                            params.schtaskFlags
                        ].filter(Boolean);
                        command = "schtasks /create " + args.join(' ');
                        return [4 /*yield*/, shellbee_1.Shell.run({
                                silent: true,
                                command: command
                            })];
                    case 1:
                        shell = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                shell.onComplete(function (shell) {
                                    if (shell.lastCode > 0) {
                                        reject(shell.stderr.join(''));
                                        return;
                                    }
                                    resolve(shell.stdout.join(''));
                                });
                            })];
                }
            });
        });
    };
    SchtasksLib.prototype.remove = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var shell;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shellbee_1.Shell.run({
                            silent: true,
                            command: "schtasks /delete /tn \"" + params.taskName + "\" /f"
                        })];
                    case 1:
                        shell = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                shell.onComplete(function (shell) {
                                    if (shell.lastCode > 0) {
                                        reject(shell.stderr.join(''));
                                        return;
                                    }
                                    resolve(shell.stdout.join(''));
                                });
                            })];
                }
            });
        });
    };
    return SchtasksLib;
}());
exports.SchtasksLib = SchtasksLib;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_providers_schtasks_SchtasksLib) && isObject(module.exports)) {
		Object.assign(_src_scheduler_providers_schtasks_SchtasksLib, module.exports);
		return;
	}
	_src_scheduler_providers_schtasks_SchtasksLib = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_CommandUtil;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandUtil = void 0;
var atma_utils_1 = require("atma-utils");
var atma_io_1 = require("atma-io");
var CommandUtil;
(function (CommandUtil) {
    function formatPaths(command, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var redirect, redirectIdx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        command = command.trim();
                        redirect = '';
                        redirectIdx = command.indexOf('>>');
                        if (redirectIdx > -1) {
                            redirect = ' ' + command.substring(redirectIdx);
                            command = command.substring(0, redirectIdx).trim();
                        }
                        command = ensureCwdIfCronbee(command, cwd);
                        return [4 /*yield*/, rewriteAbsPath(command, cwd)];
                    case 1:
                        command = _a.sent();
                        command = ensureCwd(command, cwd);
                        return [2 /*return*/, command + redirect];
                }
            });
        });
    }
    CommandUtil.formatPaths = formatPaths;
    function rewriteAbsPath(command, cwd) {
        return __awaiter(this, void 0, Promise, function () {
            var rgxCommand, match, args, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rgxCommand = /^[^\s]+/;
                        match = rgxCommand.exec(command);
                        if (match == null) {
                            return [2 /*return*/, command];
                        }
                        if (!(match[0] === 'cronbee')) return [3 /*break*/, 2];
                        return [4 /*yield*/, rewriteAbsPath(slice(command, match), cwd)];
                    case 1:
                        args = _a.sent();
                        command = "cronbee " + args;
                        _a.label = 2;
                    case 2: return [4 /*yield*/, getAbsPathIfNodeModule(match[0], cwd)];
                    case 3:
                        path = _a.sent();
                        if (path) {
                            command = path + " " + slice(command, match);
                        }
                        return [2 /*return*/, command];
                }
            });
        });
    }
    function slice(str, match) {
        return str.substring(match.index + match[0].length + 1).trim();
    }
    function getAbsPathIfNodeModule(name, cwd) {
        return __awaiter(this, void 0, void 0, function () {
            var path, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = atma_utils_1.class_Uri.combine(cwd, '/node_modules/.bin/', name);
                        return [4 /*yield*/, atma_io_1.File.existsAsync('file://' + path)];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/, path];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    }
    function ensureCwd(str, cwd) {
        if (str.includes('-cwd') === false && process.platform !== 'win32') {
            return "cd " + cwd + " && " + str;
        }
        return str;
    }
    function ensureCwdIfCronbee(command, cwd) {
        if (command.includes('cronbee') && command.includes('-cwd') === false) {
            return command + " --cwd " + cwd;
        }
        return command;
    }
})(CommandUtil = exports.CommandUtil || (exports.CommandUtil = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_CommandUtil) && isObject(module.exports)) {
		Object.assign(_src_utils_CommandUtil, module.exports);
		return;
	}
	_src_utils_CommandUtil = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_scheduler_Scheduler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var memd_1 = require("memd");
var CronTabLib_1 = _src_scheduler_providers_crontab_CronTabLib;
var SchtasksLib_1 = _src_scheduler_providers_schtasks_SchtasksLib;
var CommandUtil_1 = _src_utils_CommandUtil;
var Scheduler = /** @class */ (function () {
    function Scheduler() {
    }
    Scheduler.prototype.load = function () {
        return this.getSystem().load();
    };
    Scheduler.prototype.ensure = function (params) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var cwd, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cwd = (_a = params.workingDirectory) !== null && _a !== void 0 ? _a : process.cwd();
                        _b = params;
                        return [4 /*yield*/, CommandUtil_1.CommandUtil.formatPaths(params.taskRun, cwd)];
                    case 1:
                        _b.taskRun = _c.sent();
                        return [2 /*return*/, this.getSystem().ensure(params)];
                }
            });
        });
    };
    Scheduler.prototype.remove = function (params) {
        return this.getSystem().remove(params);
    };
    Scheduler.prototype.getSystem = function () {
        if (process.platform === 'win32') {
            return new SchtasksLib_1.SchtasksLib();
        }
        return new CronTabLib_1.CronTabLib();
    };
    __decorate([
        memd_1.default.deco.memoize()
    ], Scheduler.prototype, "getSystem", null);
    return Scheduler;
}());
exports.Scheduler = Scheduler;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_scheduler_Scheduler) && isObject(module.exports)) {
		Object.assign(_src_scheduler_Scheduler, module.exports);
		return;
	}
	_src_scheduler_Scheduler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_runner_Commands;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
var alot_1 = require("alot");
var appcfg_1 = require("appcfg");
var atma_io_1 = require("atma-io");
var Scheduler_1 = _src_scheduler_Scheduler;
var PREFIX = 'cronbee';
exports.Commands = {
    list: function (args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cfg, prefix, jobs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, appcfg_1.default.fetch([])];
                    case 1:
                        cfg = _b.sent();
                        prefix = (_a = cfg.prefix) !== null && _a !== void 0 ? _a : PREFIX;
                        return [4 /*yield*/, Jobs.load(prefix)];
                    case 2:
                        jobs = _b.sent();
                        if (jobs.length) {
                            console.log(jobs);
                        }
                        else {
                            console.log("Still no tasks with prefix: " + prefix);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    clear: function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var cronbee, currentJobs;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cronbee = new Scheduler_1.Scheduler();
                        return [4 /*yield*/, Jobs.load(PREFIX)];
                    case 1:
                        currentJobs = _a.sent();
                        // clear
                        return [4 /*yield*/, alot_1.default(currentJobs)
                                .forEachAsync(function (job) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, cronbee.remove({ taskName: job.name })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .toArrayAsync({ threads: 1 })];
                    case 2:
                        // clear
                        _a.sent();
                        console.log("Removed " + currentJobs.length, currentJobs.map(function (x) { return x.name; }));
                        return [2 /*return*/];
                }
            });
        });
    },
    ensure: function (args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var file, exists, config, jobs, _i, jobs_1, job, cronbee, currentJobs, created;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        file = (_a = args.find(function (str) { return /\w+\.\w+$/g.test(str); })) !== null && _a !== void 0 ? _a : 'cronbee.json';
                        return [4 /*yield*/, atma_io_1.File.existsAsync(file)];
                    case 1:
                        exists = _b.sent();
                        if (exists === false) {
                            console.error("Config file \"" + file + "\" not found");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, atma_io_1.File.readAsync(file)];
                    case 2:
                        config = _b.sent();
                        if (config == null || typeof config === 'string') {
                            console.error("Config from \"" + file + "\" is not resolved to Object");
                            return [2 /*return*/];
                        }
                        jobs = null;
                        if (Array.isArray(config)) {
                            jobs = config;
                        }
                        else if (Array.isArray(config.tasks)) {
                            jobs = config.tasks;
                        }
                        if (Array.isArray(jobs) === false) {
                            console.error("Config should be array of jobs, or contains property \"tasks\" as array of jobs");
                            return [2 /*return*/];
                        }
                        for (_i = 0, jobs_1 = jobs; _i < jobs_1.length; _i++) {
                            job = jobs_1[_i];
                            if (!job.taskName || !job.taskRun || !(job.cron || job.schtaskFlags)) {
                                console.error("Job is invalid. Should contain: name, command, cron || schtaskFlags");
                                console.log(job);
                                return [2 /*return*/];
                            }
                        }
                        cronbee = new Scheduler_1.Scheduler();
                        return [4 /*yield*/, Jobs.load(PREFIX)];
                    case 3:
                        currentJobs = _b.sent();
                        // clear
                        return [4 /*yield*/, alot_1.default(currentJobs)
                                .forEachAsync(function (job) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, cronbee.remove({ taskName: job.name })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })
                                .toArrayAsync({ threads: 1 })];
                    case 4:
                        // clear
                        _b.sent();
                        return [4 /*yield*/, alot_1.default(jobs)
                                .mapAsync(function (job) { return __awaiter(_this, void 0, void 0, function () {
                                var name;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            name = job
                                                .taskName
                                                .replace(/[^\w\_]/g, '_')
                                                .replace(/[_]{2,}/g, '_')
                                                .toLowerCase();
                                            return [4 /*yield*/, cronbee.ensure({
                                                    taskName: PREFIX + "\\" + name,
                                                    taskRun: job.taskRun,
                                                    cron: job.cron,
                                                    schtaskFlags: job.schtaskFlags,
                                                    workingDirectory: job.workingDirectory
                                                })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .toArrayAsync({ threads: 1 })];
                    case 5:
                        created = _b.sent();
                        console.log("Tasks " + created.length + ": ", created);
                        return [2 /*return*/];
                }
            });
        });
    }
};
var Jobs;
(function (Jobs) {
    function load(prefix) {
        return __awaiter(this, void 0, void 0, function () {
            var jobs, rgx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Scheduler_1.Scheduler().load()];
                    case 1:
                        jobs = _a.sent();
                        rgx = new RegExp("^" + prefix + "\\\\");
                        return [2 /*return*/, jobs.filter(function (x) { return rgx.test(x.name); })];
                }
            });
        });
    }
    Jobs.load = load;
})(Jobs || (Jobs = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_runner_Commands) && isObject(module.exports)) {
		Object.assign(_src_runner_Commands, module.exports);
		return;
	}
	_src_runner_Commands = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_runner_Runner;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runner = void 0;
var shellbee_1 = require("shellbee");
var everlog_1 = require("everlog");
var atma_utils_1 = require("atma-utils");
var Commands_1 = _src_runner_Commands;
var Runner = /** @class */ (function () {
    function Runner() {
    }
    Runner.prototype.run = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var args, task, cwd, command, channel, started, shell, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        args = process.argv.slice(2);
                        task = args[0];
                        if (!(task in Commands_1.Commands)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Commands_1.Commands[task](args.slice(1))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                    case 2:
                        cwd = (_a = HandleArgs.extractCwdIfAny(args)) !== null && _a !== void 0 ? _a : process.cwd();
                        command = HandleArgs.serialize(args);
                        everlog_1.Everlog.initialize({
                            directory: atma_utils_1.class_Uri.combine(cwd, '/logs/everlog/')
                        });
                        channel = everlog_1.Everlog.createChannel('cronbee', {
                            fields: [
                                {
                                    name: 'Date',
                                    type: 'date',
                                },
                                {
                                    name: 'Time',
                                    type: 'number',
                                },
                                {
                                    name: 'Command',
                                    type: 'string',
                                },
                                {
                                    name: 'Result',
                                    type: 'number',
                                },
                                {
                                    name: 'Info Logs',
                                    type: 'text'
                                },
                                {
                                    name: 'Error Logs',
                                    type: 'text'
                                }
                            ]
                        });
                        started = Date.now();
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, 6, 7]);
                        return [4 /*yield*/, shellbee_1.Shell.run({
                                command: command,
                                cwd: cwd
                            })];
                    case 4:
                        shell = _c.sent();
                        channel.writeRow([
                            new Date(),
                            Date.now() - started,
                            command,
                            shell.lastCode,
                            shell.stdout.join(''),
                            shell.stderr.join(''),
                        ]);
                        channel.flush();
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _c.sent();
                        channel.writeRow([
                            new Date(),
                            Date.now() - started,
                            command,
                            500,
                            '',
                            (_b = error_1.stack) !== null && _b !== void 0 ? _b : error_1.message,
                        ]);
                        channel.flush();
                        return [3 /*break*/, 7];
                    case 6: return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Runner;
}());
exports.Runner = Runner;
var HandleArgs;
(function (HandleArgs) {
    function whitespaces(args) {
        for (var i = 0; i < args.length; i++) {
            var str = args[i];
            if (str.includes(' ') && /'"\(/.test(str)) {
                args[i] = "\"" + str + "\"";
            }
        }
    }
    function serialize(args) {
        whitespaces(args);
        return args.join(' ');
    }
    HandleArgs.serialize = serialize;
    function extractCwdIfAny(args) {
        for (var i = 0; i < args.length; i++) {
            var str = args[i];
            if (/[\-]{1,2}cwd/i.test(str)) {
                var cwd = args[i + 1];
                args.splice(i, 2);
                return cwd;
            }
        }
        return null;
    }
    HandleArgs.extractCwdIfAny = extractCwdIfAny;
})(HandleArgs || (HandleArgs = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_runner_Runner) && isObject(module.exports)) {
		Object.assign(_src_runner_Runner, module.exports);
		return;
	}
	_src_runner_Runner = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var Runner_1 = _src_runner_Runner;
var runner = new Runner_1.Runner();
module.exports = runner;


}());
// end:source ./RootModule.js
