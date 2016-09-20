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
        anim,
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
                el.src = this.src;
            };
            originalImg.onload = function() {
                el.src = this.src;
            };

            progressiveImg.src = el.dataset.progressive;
            originalImg.src = el.dataset.original;
        }

        if (settings.async) {

            /*
             * load images asynchronously
             */

            setTimeout(function() {
                load();
            }, settings.delay);

        } else {

            /*
             * load images synchronously
             */

            load();
        }

        return;
    };

    /*
     * function to parse HTMLElements
     * @params elems HTMLElement classifier
     * @returns Array parsedElems
     */

    parseElements = function pe(elems) {
        var parsedElems = [];
        if (typeof elems === 'string') {
            parsedElems.push(document.querySelectorAll(elems));
        } else if (Array.isArray(elems)) {
            for (var i = elems.length - 1; i >= 0; --i) {
                parsedElems.push(document.querySelectorAll(elems[i]));
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
         * Parse HTMLElements and attach scroll listeners to them
         */

        listen(parsedElems.call(undefined, elems));

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
