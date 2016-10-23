var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var fs = require('fs');

var config = require('./webpack.config');
var nodeModules = {};

var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'src');
var DATA_DIR = path.resolve(__dirname, 'json');

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
    target: "node",
  devtool: 'source-map',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: [
    APP_DIR + '/server.js',
  ],
  // Output the bundled JS to dist/app.js
  output: {
    path: BUILD_DIR,
    filename: 'prod-server.js',
  },
externals: nodeModules,
    node: {
      fs: "empty",
        net: "empty",
      __dirname: false,
      __filename: false,
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
