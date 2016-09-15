/*!
 * progressively 0.1
 * https://github.com/thinker3197/progressively.js
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

;
(function(window) {
    init = function(elems, options) {
    	if(typeof elems == 'object' && typeof options == 'object') {
    		/*
    		 * Parse HTMLElements and load them progressively
    		 */
    	}

    	else {
    		throw Error('Type mismatch!')
    	}
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
}('undefined' !== typeof window) ? window : {});
