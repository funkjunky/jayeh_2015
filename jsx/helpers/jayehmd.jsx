var MarkdownIt = require('markdown-it');

var MarkdownRegexp = require('markdown-it-regexp');
var MdHighlight = require('markdown-it-highlightjs');
var MdVariables = require('mdvariables');
var MdFigCaption = require('mdfigcaption');
var MdReact = require('mdreact');
var React = require('react');
var HeaderName = require('../md-plugins/header-name');
var mdReduxGameHeader = require('../md-plugins/redux-game-header');

var Jayehmd = function(variables) {
            var md = new MarkdownIt();
            md.use(MdReact);
            md.use(MdHighlight);
            md.use(MdVariables(function() {
                return variables;
            }));
            md.use(MdFigCaption);
            md.use(HeaderName);
            md.use(mdReduxGameHeader);

            return md;
};

module.exports = Jayehmd;
