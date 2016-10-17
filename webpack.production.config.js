var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var config = require('./webpack.config');

var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'src');
var DATA_DIR = path.resolve(__dirname, 'json');

var port = process.env.HOT_LOAD_PORT || config.port || 8008;

module.exports = {
  port: port,
  devtool: 'source-map',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: [
    APP_DIR + '/bootstrap.jsx',
  ],
  // Output the bundled JS to dist/app.js
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: APP_DIR },
      { test: /\.json$/, loaders: ["json-loader"] }
    ]
  },
  plugins: [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ]
};
