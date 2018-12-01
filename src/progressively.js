/*!
* progressively 1.1.3
* https://github.com/thinker3197/progressively
* @license MIT licensed
*
* Copyright (C) 2016-17 Ashish
*/

/**
 * @typedef {import('progressively').ProgressivelySettings} ProgressivelySettings
 */

export class Progressively {

  /**
   * Progressively Class
   * @constructor
   */
  constructor (root) {
    this.root = root
    this._poll = null
    /** @type {Array<HTMLImageElement & HTMLElement>} */
    this._inodes = null

    /** @type {ProgressivelySettings} default settings */
    this._settings = {
      throttle: 300, // appropriate value, don't change unless intended
      delay: 100,
      onLoadComplete: function () { },
      onLoad: function () { },
      smBreakpoint: 600
    }

    this.listen.bind(this)
  }

  /**
   * Check if element is currently visible
   * @param {HTMLElement} el
   * @return {boolean}
   */
  inView (el) {
    let box = el.getBoundingClientRect()
    const top = box.top
    const height = box.height

    el = el.parentElement

    do {
      box = el.getBoundingClientRect()

      if (!(top <= box.bottom)) {
        return false
      }
      if ((top + height) <= box.top) {
        return false
      }

      el = el.parentElement
    } while (el && el !== document.body)

    return top <= document.documentElement.clientHeight
  }

  /**
   * Load image and add loaded-class. Loads the minified version, if small display
   * @param  {HTMLImageElement} el
   * @return boolean true, if fully loaded; false, if minified version was loaded
   */
  loadImage (el) {
    const self = this
    setTimeout(function () {
      const img = new Image()

      /** @type {(this: HTMLImageElement) => void} */
      img.onload = function () {
        el.classList.remove('progressive--not-loaded')
        el.classList.add('progressive--is-loaded')

        if (el.classList.contains('progressive__bg')) {
          // Load image as css-background-image
          el.style['background-image'] = 'url("' + this.src + '")'
        } else {
          el.src = this.src
        }

        self._settings.onLoad(el)
      }

      // Load minified version, if viewport-width is smaller than self.settings.smBreakpoint:
      if (self.getClientWidth() <= self._settings.smBreakpoint && el.getAttribute('data-progressive-sm')) {
        el.classList.add('progressive--loaded-sm')
        img.src = el.getAttribute('data-progressive-sm')
      } else {
        el.classList.remove('progressive--loaded-sm')
        img.src = el.getAttribute('data-progressive')
      }
    }, self._settings.delay)
  }

  /**
   * Returns the width of the client's viewport
   * @return integer client-width
   */
  getClientWidth () {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }

  /**
   * Listens to an event, and throttles
   */
  listen () {
    const self = this
    if (self._poll) {
      return
    }
    clearTimeout(self._poll)
    self._poll = setTimeout(function () {
      self.check()
      self.render()
      self._poll = null
    }, self._settings.throttle)
  }

  /**
   * Initializer. Finds image-elements and adds listeners.
   * @param  {ProgressivelySettings} options
   */
  init (options) {
    const self = this

    self._settings = { ...self._settings, ...options }

    self._inodes = [].slice.call(document.querySelectorAll('.progressive__img, .progressive__bg'))

    self.render()

    if (document.addEventListener) {
      self.root.addEventListener('scroll', self.listen, false)
      self.root.addEventListener('resize', self.listen, false)
      self.root.addEventListener('load', self.listen, false)
    } else {
      self.root.attachEvent('onscroll', self.listen)
      self.root.attachEvent('onresize', self.listen)
      self.root.attachEvent('onload', self.listen)
    }
  }

  /**
   * Loads necessary images in small or full quality.
   */
  render () {
    const self = this
    let elem

    for (let i = self._inodes.length - 1; i >= 0; --i) {
      elem = self._inodes[i]

      if (self.inView(elem) && elem.classList.contains('progressive--not-loaded')) {
        self.loadImage(elem)

        self._inodes.splice(i, 1)
      }
    }

    self.check()
  }

  /**
   * Check if all images are loaded in full quality, then drop.
   */
  check () {
    const self = this
    if (!self._inodes.length) {
      self._settings.onLoadComplete()
      self.drop()
    }
  }

  /**
   * Drops progressively-listeners
   */
  drop () {
    const self = this
    if (document.removeEventListener) {
      // @ts-ignore
      self.root.removeEventListener('scroll', self.listen)
      // @ts-ignore
      self.root.removeEventListener('resize', self.listen)
    } else {
      // @ts-ignore
      self.root.detachEvent('onscroll', self.listen)
      // @ts-ignore
      self.root.detachEvent('onresize', self.listen)
    }
    clearTimeout(self._poll)
  }
}

const progressively = new Progressively(window)
export default progressively
