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
        defaults, settings = {},
        pe;

    /*
     * default settings
     */

    defaults = {
        async: true,
        blur: 20,
        delay: 12 // better to keep it low
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
     * function to load images
     * @params el HTMLElement
     * @returns
     */

    loadImg = function li(el) {
        /*
         * set primary background before any image loads
         */

        el.style.background = '#efefef';

        function load() {
            var progressiveImg = new Image(),
                originalImg = new Image();

            progressiveImg.onload = function() {
                el.style.cssText += '-webkit-filter: blur(20px); filter: blur(20px); -moz-filter: blur(20px);';
                el.src = this.src;
            };
            originalImg.onload = function() {
                el.src = this.src;
                el.style.cssText -= '-webkit-filter: blur(20px); filter: blur(20px); -moz-filter: blur(20px);'
            };

            progressiveImg.src = el.dataset.progressive;
            originalImg.src = el.dataset.original;
        }

        /*
         * load images asynchronously
         */

        if (settings.async) {
            setTimeout(function() {
                load();
            }, settings.delay);
        } else {
            load();
        }

        return;
    };

    parseElements = function pe(elems) {
        if (typeof elems === 'string') {
            loadImg.call(undefined, document.querySelector(elems));
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

        parseElements.call(undefined, elems);

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
})(('undefined' !== typeof window ? window : {}));
