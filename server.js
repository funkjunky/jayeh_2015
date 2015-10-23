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

function error(err, res) {
    console.log('!!!SERVER ERROR!!!');
    console.log('type: ', err.type);
    console.log('message: ', err.message);
    if(err.stack)
        console.log('stack: ', err.stack);
    else
        console.trace();
    res.send('ERROR: \n' + err.type + '\n' + err.message + '\n' + err.stack);
}

//this well be called if /dist or node_modules doesn't match a file... it's likea  404
app.get('/dist', error.bind(app, {type: '404', message: 'resource for dist not found'}));
app.get('/node_modules', error.bind(app, {type: '404', message: 'resource for node_modules not found'}));

var proxyUrl = process.env.PROXYURL; //TODO: put this with the configs
var apiPath = 'api/';
var proxy = httpProxy.createProxyServer({ ws: true, target: proxyUrl });
app.all('/' + apiPath + '*', function(req, res) { proxy.web(req, res); } );
proxy.on('error', function(e) {
    console.log('proxy error: ', e);
});

// if using express it might look like this
app.get('*', function (req, res) {
    var path = url.parse(req.url).pathname;
    ReactAsync.renderToStringAsync(Routes({path: path}), function(err, markup) {
        if(err)
            error(err, res);
        else
            res.send('<!DOCTYPE html>'+markup);
    });
});

var port = process.env.PORT || 9002;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('REST/Socket proxy listening at ', proxyUrl + apiPath);
    console.log('Example app listening at http://%s:%s', host, port);
})
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
})
