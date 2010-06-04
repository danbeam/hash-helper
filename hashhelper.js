/**
* HashHelper
* @fileOverview  A simple class to help those that want to #hash based navigation
* @author        Dan Beam <dan@danbeam.org>
* @param         {function} a function to be used as the onChange callback
* @param         {number} an integer to denote the polling delay (in milliseconds)
* @return        {function} an instance of HashHelper (usage:var hh = new HashHelper([...args...]);)
* @class
*/

function HashHelper (delayOrFunc) {
    this.delay = "number" === typeof delayOrFunc && window.NaN !== window.parseInt(delayOrFunc) ? window.parseInt(delayOrFunc) : 300;
    this.oldHash = this.get();
    this.interval = null;
    this.onChange = "function" === typeof delayOrFunc ? delayOrFunc : function(){};
    return this;
}

/**
* HashHelper.prototype.get
* Returns the value if the text after the # in the URL (if it exists)
* @return      {string} the value of the #hash (without #) or "" (if blank or non-existant)
*/

HashHelper.prototype.get = function () {
    return window.location.hash.slice(1);
};

/**
* HashHelper.prototype.set
* Sets the hash, changing the URL without reloading the page 
* In some browsers, this also creates a new history element (allowing Back/Forward navigation)
* @param       {string} hash - the new #hash to be set (in the URL)
* @param       {function} callback (optional) - a callback to be executed after done setting
* @return      {function} returns itself (HashHelper)
*/

HashHelper.prototype.set = function (arg, callback) {
    window.location.hash = ('#' !== arg[0] ? '#' : '') + arg;
    if ('function' === typeof callback) { callback.call(this); }
    return this;
};

/**
* HashHelper.prototype.check
* See if the current #hash is different from the stored value
* If a change is detected, the onChange event is trigger
* @return      {boolean} whether the hash has changed
*/

HashHelper.prototype.check = function () {
    var     newHash = this.get(),
        changed = newHash !== this.oldHash;

    this.oldHash = newHash;
    if (true === changed) { this.onChange( newHash ); return true; }
    return false;
};

/**
* HashHelper.prototype.start
* Start polling the #hash part of the location for changes
* @param        {function} callback a callback to be executed after started (optional)
* @return       {function} a reference to itself
*/

HashHelper.prototype.start = function (callback) {
    this.check();
    if (null === this.interval) {
        var that = this;
        this.interval = window.setInterval(function (){ that.check.call(that); }, this.delay);
    }
    if ('function' === typeof callback) { callback.call(this); }
    return this;
};

/**
* Stop polling the #hash part of the location for changes
* @param        Function:callback (optional) - a callback to be executed after stopping
* @return       (self)
*/

HashHelper.prototype.stop = function (callback) {
    if (null !== this.interval) {
        window.clearInterval(this.interval);
        this.interval = null;
    }
    if ('function' === typeof callback) { callback.call(this); }
    return this;
};
