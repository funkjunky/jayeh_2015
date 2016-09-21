var RghComponent = require('../components/one-offs/redux-game-header');
var React = require('react');
var Plugin = require('markdown-it-regexp');

var mdReduxGameHeader = Plugin(
    /%reduxgameheader%/g,
    function(match, utils) {
        return React.createElement(RghComponent, null);
    }
);

module.exports = mdReduxGameHeader;
