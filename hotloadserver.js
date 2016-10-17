var Favicon = require('serve-favicon');
var httpProxy = require('http-proxy');
var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

var proxyUrl = 'localhost:1828';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    proxy: {
        '/api': {
            target: proxyUrl,
            secure: false,
        }
    },
    stats: {
        colors: true,
        chunks: false,
    },
    //historyApiFallback: true
}).listen(config.port, 'localhost', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('REST/Socket proxy listening at ', proxyUrl);
    console.log('Jayeh\'s hot-dev listening on port %s', config.port);
});

