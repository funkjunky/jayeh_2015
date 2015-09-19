var Plugin = require('markdown-it-regexp');

var MdFigCaption = Plugin(
    /@\[(\w+)\]\((\w+)\)/,
    function(match, utils) {
        console.log('we matched!')
        return 'matcher';
    }
);
