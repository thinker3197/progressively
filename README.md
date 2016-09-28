# Progressively

Progressively is a javascript library for loading images progressively. It’s written entirely in JavaScript so it doesn’t depend on 3rd-party libraries like jQuery. It's super small, < 1.2kB when minified & gzipped! It will load images on when user browse to the page, saving bandwidth & server requests. It is compatible with all modern browsers. [Demo](https://thinker3197.github.io/progressively)

![demo-image](https://raw.githubusercontent.com/thinker3197/progressively/master/demo.gif)

## Usage & Api

### Installation

```
bower install progressively
npm install progressively
```

```html
<head>
  <link src="progressively.min.css">
</head>
<body>

  <figure class="progressive">
    <img class="progressive__img progressive--not-loaded" data-progressive="img/highQualityImg" src="img/lowQualityImg">
  </figure>

  <script src="progressively.min.js"></script>
  <script>
    progressively.init(options);
  </script>
</body>
```
The `src` attribute will contain the lower quality image (< 20kb for ideal cases) and `data-progressive` attribute will hold the path/url to high quality image. See [demo](https://thinker3197.github.io/progressively) for examples.  

## .init() (options)

The `init()` API has a few options

#### throttle
Type: `Number` Default: `300`

The `throttle` is managed by an internal function that prevents performance issues from continuous firing of `window.onscroll` events. Using a throttle will set a small timeout when the user scrolls and will keep throttling until the user stops. The default is 300 milliseconds.

#### delay
Type: `Number` Default: `100` value

The `delay` function sets the timout value for images to start load asynchronously. Ideally it's value should be low.

#### onloadComplete
Type: `Function` Arguments: `None`

The `afterload` function is callback function which executes when all images have loaded. It is fired when all the image elements have the `*--is-loaded` class.

#### onload
Type: `Function` Arguments: `HTMLElement`

The `imgload` function is invoked whenever an image elements finishes loading. It accepts `HTMLElement` as an argument which is the current element that is loaded.

```js
progressively.init({
  delay: 50,
  throttle: 300,
  imgload: function(elem) {
    console.log(elem);
  },
  afterload: function() {
    console.log('All images have finished loading!');
  }
});
```

## .render()

Progressively has a `render()` method that can be used to make progressively poll your images when you're not scrolling. For instance in some case you want to render your images before/widthout scrolling down to the image, you can use `render`

## Contributing

Make sure you follow linting guidelines. For bugs or feature request, open an issue. Create a seprate branch by the name of your feature request and then send PR.

## License
MIT license