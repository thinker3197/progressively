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
        extend,
        loadImg,
        parseElements,
        defaults, settings, pe;

    /*
     * default settings
     */

    defaults = {
        async: true,
        blur: 20
    };

    /*
     * function to extend to objects
     * @params primaryObject object, secondaryObject object
     * @return object
     */

    extend = function et(primaryObject, secondaryObject) {
        var o = {};
        for (var prop in primaryObject) {
            o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop];
        }
        return o;
    };

    /*
     * function to extend to objects
     * @params primaryObject object, secondaryObject object
     * @return object
     */

    loadImg = function li(el) {
        el.style.background = '#eee';

        if (defaults.async) {
            var img = new Image();
            img
        } else {

        }
    };

    parseElements = function pe(elems) {
        if (elems === 'string') {
            document.querySelectorAll(elems);
        } else if (Array.isArray(elems)) {
            for (var i = elems.length; i >= 0; --i) {
                loadImg.call(undefined, elems[i]);
            }
        } else throw TypeError('Undefined format!');
    }

    init = function(elems, options) {
        elems = elems || [];
        options = options || {};

        /*
         * Extend default settings with user options
         */

        settings = extend.call(undefined, defaults, options);

        /*
         * Parse HTMLElements and load them progressively
         */

        return;
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
