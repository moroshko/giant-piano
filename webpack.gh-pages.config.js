var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './demo/src/index',

  output: {
    filename: './demo/dist/index.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'), // Must be an absolute path
        path.join(__dirname, 'demo', 'src') // Must be an absolute path
      ]
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!less')
    }]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'components', 'src']
  },

  plugins: [
    new ExtractTextPlugin('./demo/dist/app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
};
