/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/progressively.js',
  output: {
    filename: 'progressively.min.js',
    library: 'progressively',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, use: { loader: 'babel-loader' } }
    ]
  },
}

export default config