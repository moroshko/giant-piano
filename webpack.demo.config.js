var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:1704',
    './demo/src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'), // Must be an absolute path
    filename: 'index.js',
    publicPath: '/demo/dist'
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
    new ExtractTextPlugin('app.css')
  ]
};
