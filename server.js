var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.demo.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath
}).listen(1704, 'localhost', function(error) {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.log('Demo is ready at http://localhost:1704/demo/dist/index.html'); // eslint-disable-line no-console
  }
});
