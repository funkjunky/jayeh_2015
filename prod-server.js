'use strict';

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _httpProxy = require('http-proxy');

var _httpProxy2 = _interopRequireDefault(_httpProxy);

var _getStore = require('./src/helpers/getStore.jsx');

var _getStore2 = _interopRequireDefault(_getStore);

var _Routes = require('./src/Routes.jsx');

var _Routes2 = _interopRequireDefault(_Routes);

var _renderHtml = require('./src/renderHtml.jsx');

var _renderHtml2 = _interopRequireDefault(_renderHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 9002;
var host = 'localhost';

// Setup the express server
var app = (0, _express2.default)();

app.use((0, _compression2.default)());
app.use((0, _serveFavicon2.default)(__dirname + '/favicon.ico'));

if (process.env.NODE_ENV === "production") {
    app.use('/build', _express2.default.static(_path2.default.join(__dirname, '/build')));
}

//TODO: Check each of these...
app.use('/node_modules', _express2.default.static(__dirname + '/node_modules'));
app.use('/static', _express2.default.static(_path2.default.join(__dirname, '/static')));
app.use('/dist', _express2.default.static(_path2.default.join(__dirname, '/static')));

//this well be called if /dist or node_modules doesn't match a file... it's likea  404
//TODO: handle this better...
var error = function error(err, req, res) {
    console.log('STATIC 404');res.status(404).send('error couldnt find');
};
app.use('/dist', error.bind(app, { type: '404', message: 'resource for dist not found' }));
app.use('/static', error.bind(app, { type: '404', message: 'resource for dist not found' }));
app.use('/node_modules', error.bind(app, { type: '404', message: 'resource for node_modules not found' }));

//TODO: double check this... maybe security issue?
//app.use(cors());
var proxyUrl = process.env.PROXYURL; //TODO: put this with the configs
var apiPath = 'api/';
var proxy = _httpProxy2.default.createProxyServer({ ws: true, target: proxyUrl, changeOrigin: true });
app.all('/' + apiPath + '*', function (req, res) {
    proxy.web(req, res);
});
proxy.on('error', function (e) {
    console.log('proxy error: ', e);
});
proxy.on('proxyRes', function (proxyRes, req, res, options) {
    console.log('RAW RESPONSE HEADERS: ', JSON.stringify(proxyRes.headers, true, 2));

    proxyRes.on('data', function (dataBuffer) {
        var data = dataBuffer.toString('utf8');
        console.log("This is the data from target server : " + data);
    });
});
app.use(function (req, res) {
    console.log('url: ', req.url);
    var store = (0, _getStore2.default)();
    (0, _reactRouter.match)({ routes: (0, _Routes2.default)(store), location: req.url }, function (error, redirectLocation, renderProps) {
        if (error) {
            res.status(500).send(error.message);
        } else if (renderProps) {
            (function () {
                //Wait till everything has been loaded
                //See: actions/dispatchFetch and reducers/app/loading
                var jsxPage = function jsxPage(store) {
                    return (0, _renderHtml2.default)((0, _server.renderToString)(_react2.default.createElement(
                        _reactRedux.Provider,
                        { store: store },
                        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
                    )), store.getState());
                };
                if (store.getState().app.loading.length === 0) res.status(200).send(jsxPage(store));else {
                    (function () {
                        var unsubscribe = store.subscribe(function () {
                            if (store.getState().app.loading.length === 0) {
                                res.status(200).send(jsxPage(store));
                                unsubscribe();
                            }
                        });
                    })();
                }
            })();
        } else res.status(404).send('Not Found');
    });
});

app.use(function (err, req, res, next) {
    console.log('ERROR: ', err);
    res.status(500).send('error');;
});

process.on('unhandledRejection', function (reason, p) {
    console.log('unhandled promise rejection: ', reason);
    process.exit(1);
});

var server = app.listen(port);

//TODO: figure out what this is used for?
server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

//if (process.env.NODE_ENV === "development") {
console.log('server.js is listening on port ' + port);
//}

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(port, 'port', 'server.js');

    __REACT_HOT_LOADER__.register(host, 'host', 'server.js');

    __REACT_HOT_LOADER__.register(app, 'app', 'server.js');

    __REACT_HOT_LOADER__.register(error, 'error', 'server.js');

    __REACT_HOT_LOADER__.register(proxyUrl, 'proxyUrl', 'server.js');

    __REACT_HOT_LOADER__.register(apiPath, 'apiPath', 'server.js');

    __REACT_HOT_LOADER__.register(proxy, 'proxy', 'server.js');

    __REACT_HOT_LOADER__.register(server, 'server', 'server.js');
}();

;
