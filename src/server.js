import { match, RouterContext, Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Express from 'express';
import path from 'path';
import Favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';

import getStore from './helpers/getStore.jsx';
import Routes from './routes.jsx';
import renderHtml from './renderHtml.jsx';

var port = process.env.PORT || 9002;
var host = 'localhost';

// Setup the express server
var app = Express();

app.use(compression());
app.use(Favicon(__dirname + '/favicon.ico'));

if (process.env.NODE_ENV === "production") { app.use('/build', Express.static(path.join(__dirname, '/build'))); }

//TODO: Check each of these...
app.use('/node_modules', Express.static(__dirname + '/../node_modules'));
app.use('/static', Express.static(path.join(__dirname)));
app.use('/dist', Express.static(path.join(__dirname)));

//this well be called if /dist or node_modules doesn't match a file... it's likea  404
//TODO: handle this better...
let error = (err, req, res) => { console.log('STATIC 404'); res.status(404).send('error couldnt find'); }
app.use('/dist', error.bind(app, {type: '404', message: 'resource for dist not found'}));
app.use('/static', error.bind(app, {type: '404', message: 'resource for dist not found'}));
app.use('/node_modules', error.bind(app, {type: '404', message: 'resource for node_modules not found'}));

//TODO: double check this... maybe security issue?
//app.use(cors());
var proxyUrl = process.env.PROXYURL; //TODO: put this with the configs
var apiPath = 'api/';
var proxy = httpProxy.createProxyServer({ ws: true, target: proxyUrl, changeOrigin: true });
app.all('/' + apiPath + '*', function(req, res) { proxy.web(req, res); } );
proxy.on('error', function(e) {
    console.log('proxy error: ', e);
});
proxy.on('proxyRes', function(proxyRes, req, res, options) {
    console.log('RAW RESPONSE HEADERS: ', JSON.stringify(proxyRes.headers, true, 2));

    proxyRes.on('data' , function(dataBuffer){
        var data = dataBuffer.toString('utf8');
        console.log("This is the data from target server : "+ data);
    });

});
app.use(function (req, res) {
    global.__host = req.protocol + '://' + req.get('host');
    console.log('url: ', req.url);
    let store = getStore();
    match({ routes: Routes(store), location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        }
        else if(renderProps) {
            //Wait till everything has been loaded
            //See: actions/dispatchFetch and reducers/app/loading
            let jsxPage = (store) => renderHtml(renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>), store.getState(), global.__host);
            if(store.getState().app.loading.length === 0)
                res.status(200).send(jsxPage(store));
            else {
                const unsubscribe = store.subscribe(() => {
                    if(store.getState().app.loading.length === 0) {
                        res.status(200).send(jsxPage(store));
                        unsubscribe();
                    }
                });
            }
        }
        else
            res.status(404).send('Not Found');
    });
});

app.use((err, req, res, next) => {
    console.log('ERROR: ', err);
    res.status(500).send('error');;
});

process.on('unhandledRejection', (reason, p) => {
    console.trace('unhandled promise rejection: ', reason);
    //throw reason;
    //process.exit(1);
});

let server = app.listen(port);

//TODO: figure out what this is used for?
server.on('upgrade', function (req, socket, head) {
  proxy.ws(req, socket, head);
})

//if (process.env.NODE_ENV === "development") {
    console.log('server.js is listening on port ' + port);
//}
