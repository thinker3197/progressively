declare module 'progressively' {
  var progressively: Progressively
  export = progressively

  export interface ProgressivelySettings {
    /**
     * The `throttle` is managed by an internal function that prevents performance issues from
     * continuous firing of `window.onscroll` events.
     * Using a throttle will set a small timeout when the user scrolls and will keep throttling 
     * until the user stops. The default is 300 milliseconds.
     * @default 300
     */
    throttle: number
    /**
     * The `delay` function sets the timeout value for images to start load asynchronously. Ideally it's value should be low.
     * @default 100
     */
    delay: number
    /**
     * The `loadImage` function uses this value, to load images in a medium quality 
     * (if defined and if the user's viewport is smaller than smBreakpoint).
     * @default 600
     */
    smBreakpoint: number
    /**
     * The `onLoadComplete` function is callback function which executes when all images have loaded.
     * It is fired when all the image elements have the `*--is-loaded` class.
     * @default none
     */
    onLoadComplete: () => void
    /**
     * The `onLoad` function is invoked whenever an image elements finishes loading.
     * It accepts `HTMLElement` as an argument which is the current element that is loaded.
     * @default none
     */
    onLoad: (e: HTMLElement) => void
  }

  /** Progressively Class */
  export class Progressively {
    constructor(root)
    /** Initializer. Finds image-elements and adds listeners. */
    public init(options: ProgressivelySettings): void
  }
}