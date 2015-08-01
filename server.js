var Express = require('express');
var Favicon = require('serve-favicon');
var url = require('url');
var React = require('react');
var ReactAsync = require('react-async');
var httpProxy = require('http-proxy');

var Routes = React.createFactory(require('./src/routes'))

var app = Express();
app.use(Favicon(__dirname + '/favicon.ico'));

app.use('/dist', Express.static(__dirname + '/dist'));
app.use('/node_modules', Express.static(__dirname + '/node_modules'));

var proxy = httpProxy.createProxyServer({ ws: true, target: 'http://localhost:1212/' });
app.all('/api/*', function(req, res) { proxy.web(req, res); } );
app.all('/socket.io/*', function(req, res) { proxy.web(req, res); } );
proxy.on('error', function(e) {
    console.log('proxy error: ', e);
});

// if using express it might look like this
app.get('*', function (req, res) {
    var path = url.parse(req.url).pathname;
    ReactAsync.renderToStringAsync(Routes({path: path}), function(err, markup) {
        if(err) {
            console.log('!!!SERVER ERROR!!!');
            console.log('type: ', err.type);
            console.log('message: ', err.message);
            console.log('stack: ', err.stack);
            res.send('ERROR: \n' + err.type + '\n' + err.message + '\n' + err.stack);
        }
        else
            res.send('<!DOCTYPE html>'+markup);
    });
});

var server = app.listen(9001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head)
})
