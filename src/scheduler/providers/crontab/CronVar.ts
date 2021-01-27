/**
 * Constants
 */
const ITEMREX = /^(\S+)=(.+)$/;

/**
 * @class CronVar
 * A JavaScript representation of a cron environment variable.
 *
 * Examples:
 *     var env = new CronVar('MAIL=user@domain.org');
 *
 * @param {String} __line__
 */
export class CronVar {

    _name = null;
    _val = null;
    valid = false;

    constructor(public line: string) {
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
     *         var vars = tab.vars({name:'MAIL'});
     *         for (var i = 0; i < vars.length; i++) {
     *             console.log(vars[i].render());
     *         }
     *     });
     *
     * @return {String}
     */
    render = function () {
        return this.name + '=' + this.val;
    }
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
    name = function (c) {
        if (c) {
            this._name = '' + c;
        }

        return this._name;
    }
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
    val(c) {
        if (c) {
            this._val = '' + c;
        }

        return this._val;
    }
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
    toString() {
        return this.render();
    }

    /**
     * Initializes a new CronVar object.
     *
     * @api private
     */
    init() {
        var tokens = (this.line || '').match(ITEMREX);

        if (tokens && tokens.length > 0) {
            this._name = tokens[1];
            this._val = tokens[2];
            this.valid = true;
        }
        else {
            throw new Error('Expected an env variable declaration line');
        }
    }


}

