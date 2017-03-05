/*!
 * progressively 1.0.0
 * https://github.com/thinker3197/progressively
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

import './progressively.css'

var progressively = {}

var defaults, poll, onLoad, inodes

onLoad = function () {}

function extend (primaryObject, secondaryObject) {
  var o = {}
  for (var prop in primaryObject) {
    o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop]
  }
  return o
};

function isHidden (el) {
  return (el.offsetParent === null)
};

function inView (el, view) {
  if (isHidden(el)) {
    return false
  }

  var box = el.getBoundingClientRect()
  return (
          box.top >= 0 &&
          box.left >= 0 &&
          box.right <= (window.innerWidth || document.el.clientWidth) &&
          box.bottom <= (window.innerHeight || document.el.clientHeight) ||
          el.clientHeight >= window.innerHeight
  )
};

function loadImage (el) {
  setTimeout(function () {
    var img = new Image()

    img.onload = function () {
      el.classList.remove('progressive--not-loaded')
      el.classList.add('progressive--is-loaded')
      el.src = this.src

      onLoad(el)
    }

    img.src = el.dataset.progressive
  }, defaults.delay)
};

function listen () {
  if (poll) {
    return
  }
  clearTimeout(poll)
  poll = setTimeout(function () {
    progressively.check()
    progressively.render()
    poll = null
  }, defaults.throttle)
}
  /*
   * default settings
   */

defaults = {
  throttle: 300, // appropriate value, don't change unless intended
  delay: 100,
  onLoadComplete: function () {},
  onLoad: function () {}
}

progressively.init = function (options) {
  options = options || {}

  defaults = extend(defaults, options)

  onLoad = defaults.onLoad || onLoad

  inodes = [].slice.call(document.querySelectorAll('.progressive__img'))

  progressively.render()

  if (document.addEventListener) {
    window.addEventListener('scroll', listen, false)
    window.addEventListener('load', listen, false)
  } else {
    window.attachEvent('onscroll', listen)
    window.attachEvent('onload', listen)
  }
}

progressively.render = function () {
  var elem

  for (var i = inodes.length - 1; i >= 0; --i) {
    elem = inodes[i]

    if (inView(elem) && elem.classList.contains('progressive--not-loaded')) {
      loadImage(elem)
      inodes.splice(i, 1)
    }
  }

  this.check()
}

progressively.check = function () {
  if (!inodes.length) {
    defaults.onLoadComplete()
    this.drop()
  }
}

progressively.drop = function () {
  if (document.removeEventListener) {
    window.removeEventListener('scroll', listen)
  } else {
    window.detachEvent('onscroll', listen)
  }
  clearTimeout(poll)
}

export default progressively
