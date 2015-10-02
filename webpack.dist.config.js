var path = require('path');

module.exports = [{
  entry: './src/createPagination.js',

  output: {
    filename: './dist/createPagination.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src') // Must be an absolute path
      ]
    }]
  }
}];
