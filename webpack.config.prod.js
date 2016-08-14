var path = require('path');
var webpack = require('webpack');

var DEV = 'dev';
var PUBLIC = './public/';

module.exports = {
  devtool: 'source-map',
  entry: [
    './'+ DEV +'/app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: PUBLIC
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
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
      },
      // JSON
      { 
        test: /\.json$/, 
        loader: 'json' 
      },
      // add libs to window
      { 
        test: require.resolve('react'), 
        loader: 'expose?React' 
      }
    ]
  }
};
