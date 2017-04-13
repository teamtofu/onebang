var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/example.js',
  output: {
    path: __dirname + '/',
    publicPath: '/test/webpack/',
    filename: 'bundle.js'
  }
};