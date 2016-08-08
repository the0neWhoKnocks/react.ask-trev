var path = require('path');
var webpack = require('webpack');

var DEV = 'dev';
var PUBLIC = 'public';

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './'+ DEV +'/app.js'
  ],
  output: {
    filename: 'bundle.js', // file isn't actually generated, but rather served up dynamically through memory
    path: path.join(__dirname, PUBLIC), // actual path required, even though it's not used
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, DEV)
    },
    // CSS
    { 
      test: /\.styl$/, 
      include: path.join(__dirname, DEV),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
