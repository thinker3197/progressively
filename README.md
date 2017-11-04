# Progressively

[![Travis](https://img.shields.io/travis/thinker3197/progressively.svg)](https://travis-ci.org/thinker3197/progressively)
[![Coveralls](https://img.shields.io/coveralls/thinker3197/progressively.svg)](https://coveralls.io/github/thinker3197/progressively?branch=master)
[![npm (scoped)](https://img.shields.io/npm/v/progressively.svg)](https://www.npmjs.com/package/progressively)
[![David](https://img.shields.io/david/thinker3197/progressively.svg)](https://david-dm.org/thinker3197/progressively)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> A JavaScript library to load images progressively

It’s written entirely in JavaScript so it doesn’t depend on 3rd-party libraries like jQuery. It's super small, < 1.2kB when minified & gzipped! It will load the full-size images only when the user browses to that part of the page, saving bandwidth & server requests. It is compatible with all modern browsers. See the [Demo](https://thinker3197.github.io/progressively).

![demo-image](https://raw.githubusercontent.com/thinker3197/progressively/master/demo.gif)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install --save progressively
```

Alternatively you can use [Bower](https://bower.io/).

```sh
$ bower install progressively
```

With a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import progressively from 'progressively'

// using CommonJS modules
var progressively = require('progressively')
```

The [UMD](https://github.com/umdjs/umd) build is also available on CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/progressively/dist/progressively.min.js"></script>
<!-- or -->
<script src="https://unpkg.com/progressively/dist/progressively.min.js"></script>
```
Once loaded, you can access the library on `window.progressively`.

You also need to embed the css file at your page

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressively/dist/progressively.min.css">
<!-- or -->
<link rel="stylesheet" href="https://unpkg.com/progressively/dist/progressively.min.css">
```

## Usage

Add a image to your `HTML` file setting the `src` attribute containing the lower quality image (< 20kb for ideal cases) and the `data-progressive` attribute holding the path/url to the high quality image.

You can use [lowly](https://github.com/thiamsantos/lowly) to create the images in low quality. Just run `npm i -g lowly` and then `lowly image.jpg`, after that a new image `image-lowly.jpg` will be created in the same directory of source image.

```html
<figure class="progressive">
  <img class="progressive__img progressive--not-loaded" data-progressive="img/highQualityImg.png" src="img/lowQualityImg.png">
</figure>
```

And initiate the script.

```js
progressively.init()
```

See [demo](https://thinker3197.github.io/progressively) for examples.

### Use medium quality images for mobile devices

You can add a medium resolution image via `data-progressive-sm` to reduce the filesize on mobile devices with small screens. The default breakpoint for loading `progressive-sm` image is `600` (in device independent pixels). Progressively will load the `data-progressive-sm` image when the user's device width is less than `smBreakpoint` value.

```html
<figure class="progressive">
  <img class="progressive__img progressive--not-loaded" data-progressive="img/highQualityImg.png" data-progressive-sm="img/mediumQualityImg.png" src="img/lowQualityImg.png">
</figure>
```

### Use as bg-image

You can also use progressively for background-images. Simply use `progressive__bg` instead of `progressive__img`:

```html
<div class="progressive__bg progressive--not-loaded" data-progressive="img/highQualityImg.png" data-progressive-sm="img/mediumQualityImg.png" style="background-image: url('img/lowQualityImg.png');"></div>
```

## API

### progressively.init(options)

The `init()` API has a few options

#### throttle
Type: `Number` Default: `300`

The `throttle` is managed by an internal function that prevents performance issues from continuous firing of `window.onscroll` events. Using a throttle will set a small timeout when the user scrolls and will keep throttling until the user stops. The default is 300 milliseconds.

#### delay
Type: `Number` Default: `100` value

The `delay` function sets the timout value for images to start load asynchronously. Ideally it's value should be low.

#### smBreakpoint
Type: `Number` Default: `600` value

The `loadImage` function uses this value, to load images in a medium quality (if defined and if the user's viewport is smaller than smBreakpoint).

#### onLoadComplete
Type: `Function` Arguments: `None`

The `onLoadComplete` function is callback function which executes when all images have loaded. It is fired when all the image elements have the `*--is-loaded` class.

#### onLoad
Type: `Function` Arguments: `HTMLElement`

The `onLoad` function is invoked whenever an image elements finishes loading. It accepts `HTMLElement` as an argument which is the current element that is loaded.

```js
progressively.init({
  delay: 50,
  throttle: 300,
  smBreakpoint: 600,
  onLoad: function(elem) {
    console.log(elem);
  },
  onLoadComplete: function() {
    console.log('All images have finished loading!');
  }
});
```

### progressively.render()

Progressively has a `render()` method that can be used to make progressively poll your images when you're not scrolling. For instance in some case you want to render your images before/widthout scrolling down to the image, you can use `render`.

## Contribute
See the [contributing file](CONTRIBUTING.md) for instructions.

## License
[MIT license](LICENSE) &copy; [Ashish](https://thinker3197.github.io/)
