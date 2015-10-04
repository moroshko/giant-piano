var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.demo.config');
var opn = require('opn');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(1704, 'localhost', function(error) {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    opn('http://localhost:1704/demo/dist/index.html');
  }
});
