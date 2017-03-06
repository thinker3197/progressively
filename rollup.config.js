import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'
import cssnano from 'cssnano'

export default {
  entry: 'src/progressively.js',
  format: 'umd',
  moduleName: 'progressively',
  plugins: [
    postcss({
      plugins: [
        cssnano()
      ]
    }),
    buble()
  ],
  dest: 'dist/progressively.js'
}
