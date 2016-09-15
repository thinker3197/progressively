/*!
 * progressively 0.1
 * https://github.com/thinker3197/progressively.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

;
(function(window) {
    'use strict';

    var init,
    	defaults;

    /*
     * default settings
     */

    defaults = {
    	async: true,
    	blur: 20,
    };

    /*
     * function to extend to objects
     * @params primaryObject object, secondaryObject object
     * @return object
     */

    function extend(primaryObject, secondaryObject) {
    	for(var prop in primaryObject) {
    		console.log
    	}
    }

    init = function(elems, options) {
        options = options || {};
        elem = elems || [];

        /*
         * Extend default settings with user options
         */

        extend(options, defaults);
        /*
         * Parse HTMLElements and load them progressively
         */

        parseElements(this, elems);
    };

    /*
     * Exposure when used in AMD environment
     */

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return init;
        });
        return;
    }

    /*
     * Exposure when being used with NodeJS
     */

    if ('undefined' !== typeof module && module.exports) {
        module.exports = init;
        return;
    }

    /*
     * Exposure to the window, if it exists
     */

    window.progressively = init;
}('undefined' !== typeof window ? window : {}));
