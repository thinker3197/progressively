(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.progressively = factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

__$styleInject(".progressive{overflow:hidden;position:relative;background:#efefef}.progressive__img{display:block;width:100%;height:100%;transform:translateZ(0)}.progressive--not-loaded{filter:blur(30px)}.progressive--is-loaded{filter:blur(20px);animation:a .5s both}@keyframes a{0%{filter:blur(20px)}to{filter:blur(0)}}",undefined);

/*!
 * progressively 1.0.0
 * https://github.com/thinker3197/progressively
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

var progressively = {};

var defaults;
var poll;
var onLoad;
var inodes;

onLoad = function () {};

function extend (primaryObject, secondaryObject) {
  var o = {};
  for (var prop in primaryObject) {
    o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop];
  }
  return o
}

function isHidden (el) {
  return (el.offsetParent === null)
}

function inView (el, view) {
  if (isHidden(el)) {
    return false
  }

  var box = el.getBoundingClientRect();
  return (
          box.top >= 0 &&
          box.left >= 0 &&
          box.right <= (window.innerWidth || document.el.clientWidth) &&
          box.bottom <= (window.innerHeight || document.el.clientHeight) ||
          el.clientHeight >= window.innerHeight
  )
}

function loadImage (el) {
  setTimeout(function () {
    var img = new Image();

    img.onload = function () {
      el.classList.remove('progressive--not-loaded');
      el.classList.add('progressive--is-loaded');
      el.src = this.src;

      onLoad(el);
    };

    img.src = el.dataset.progressive;
  }, defaults.delay);
}

function listen () {
  if (poll) {
    return
  }
  clearTimeout(poll);
  poll = setTimeout(function () {
    progressively.check();
    progressively.render();
    poll = null;
  }, defaults.throttle);
}
  /*
   * default settings
   */

defaults = {
  throttle: 300, // appropriate value, don't change unless intended
  delay: 100,
  onLoadComplete: function () {},
  onLoad: function () {}
};

progressively.init = function (options) {
  options = options || {};

  defaults = extend(defaults, options);

  onLoad = defaults.onLoad || onLoad;

  inodes = [].slice.call(document.querySelectorAll('.progressive__img'));

  progressively.render();

  if (document.addEventListener) {
    window.addEventListener('scroll', listen, false);
    window.addEventListener('load', listen, false);
  } else {
    window.attachEvent('onscroll', listen);
    window.attachEvent('onload', listen);
  }
};

progressively.render = function () {
  var elem;

  for (var i = inodes.length - 1; i >= 0; --i) {
    elem = inodes[i];

    if (inView(elem) && elem.classList.contains('progressive--not-loaded')) {
      loadImage(elem);
      inodes.splice(i, 1);
    }
  }

  this.check();
};

progressively.check = function () {
  if (!inodes.length) {
    defaults.onLoadComplete();
    this.drop();
  }
};

progressively.drop = function () {
  if (document.removeEventListener) {
    window.removeEventListener('scroll', listen);
  } else {
    window.detachEvent('onscroll', listen);
  }
  clearTimeout(poll);
};

return progressively;

})));
