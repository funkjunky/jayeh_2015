import { match, RouterContext } from 'react-router'
import { renderToString } from 'react-dom/server';
import React from 'react';
import express from 'express';
import path from 'path';
import Favicon from 'serve-favicon';
import compression from 'compression';

import Routes from './src/routes.jsx';
import Index from './src/Index.jsx';

var port = process.env.PORT || 9002;
var host = 'localhost';

// Setup the express server
var app = express();

app.use(compression());
app.use(Favicon(__dirname + '/favicon.ico'));

if (process.env.NODE_ENV === "production") { app.use('/build', express.static(path.join(__dirname, '/build'))); }

app.use('/static', express.static(path.join(__dirname, '/static')));

//TODO: double check this... maybe security issue?
//app.use(cors());

app.use(function (req, res) {
    console.log('url: ', req.url);
    match({ Routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        }
        else if(renderProps) {
            res.status(200).send(renderToString(<Index><RouterContext {...renderProps} /></Index>));
        }
        else
            res.status(404).send('Not Found');
    });
});

app.listen(port);

//if (process.env.NODE_ENV === "development") {
    console.log('server.js is listening on port ' + port);
//}
