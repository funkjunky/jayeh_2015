var React = require('react');
var Plugin = require('markdown-it-regexp');
var ParallexHeader = require('../parallex-header');

var MdParallexHeader= Plugin(
    /~(\w+)/,
    function(match, utils) {
        console.log('inside');
        return (
            <ParallexHeader stuff={match[1]} />
        )
    }
);

module.exports = MdParallexHeader;
