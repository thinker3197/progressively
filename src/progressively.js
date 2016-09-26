/*!
 * progressively 0.1
 * https://github.com/thinker3197/progressively
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.progressively = factory(root);
    }
})(this, function(root) {

    'use strict';

    var progressively = {};

    var defaults, poll, useDebounce;

    function extend(primaryObject, secondaryObject) {
        var o = {};
        for (var prop in primaryObject) {
            o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop];
        }
        return o;
    };

    function isHidden(el) {
        return (el.offsetParent === null);
    };

    function inView(el, view) {
        if (isHidden(el)) {
            return false;
        }

        var box = el.getBoundingClientRect();
        return (
            box.top >= 0 &&
            box.left >= 0 &&
            box.bottom <= (window.innerHeight || document.el.clientHeight) &&
            box.right <= (window.innerWidth || document.el.clientWidth));

    };

    function loadImg(el, callback) {
        setTimeout(function() {
            var img = new Image();

            img.onload = function() {
                el.src = this.src;
                el.classList.remove('progressive--not-loaded');
                el.classList.add('progressive--is-loaded');
                if (typeof callback === 'function')
                    callback();
            };

            img.src = el.dataset.progressive;
        }, defaults.delay);
    };

    function listen() {
        if (!useDebounce && !!poll) {
            return;
        }
        clearTimeout(poll);
        poll = setTimeout(function() {
            progressively.render();
            poll = null;
        }, defaults.throttle);
    }
    /*
     * default settings
     */

    defaults = {
        throttle: 100,
        blur: 20,
        delay: 12,
        imgLoaded: function(){}
    };

    progressively.init = function(options) {
        options = options || {};

        defaults = extend(defaults, options);

        progressively.render();

        if (document.addEventListener) {
            root.addEventListener('scroll', listen, false);
            root.addEventListener('load', listen, false);
        } else {
            root.attachEvent('onscroll', listen);
            root.attachEvent('onload', listen);
        }
    };

    progressively.render = function() {
        var inodes = document.querySelectorAll('.progressive__img'),
            fnodes = document.querySelectorAll('.progressive'),
            elem;

        for (var i = inodes.length - 1; i >= 0; --i) {
            elem = inodes[i];

            if (inView(elem) && elem.classList.contains('progressive--not-loaded')) {
                loadImg(elem, function(){
                    defaults.imgLoaded();
                });
            }

        }

        if (!inodes.length || !fnodes.length) {
            progressively.drop();
        }
    };

    progressively.drop = function() {
        root.removeEventListener('scroll', listen);
        root.removeEventListener('load', listen);
    };

    return progressively;
});
