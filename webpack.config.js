var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var config = require('./webpack.config');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var DATA_DIR = path.resolve(__dirname, 'json');

var port = process.env.HOT_LOAD_PORT || config.port || 8008;

module.exports = {
  port: port,
  devtool: '#eval-source-map',
  // This will be our app's entry point (webpack will look for it in the 'src' directory due to the modulesDirectory setting below). Feel free to change as desired.
  entry: [
    //'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:' + port,
    'webpack/hot/dev-server',
    APP_DIR + '/index.jsx',
  ],
  // Output the bundled JS to dist/app.js
  output: {
    path: BUILD_DIR,
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  /*
  resolve: {
    // Look for modules in .js(x)
    extensions: ['', '.js', '.jsx'],
    // Add 'src' to our modulesDirectories, as all our app code will live in there, so Webpack should look in there for modules
    modulesDirectories: ['src', 'node_modules'],
  },
  */
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], include: APP_DIR },
      { test: /\.json$/, loaders: ["json-loader"] }
    ]
  },
  plugins: [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
  ]
};
