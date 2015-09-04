var Plugin = require('markdown-it-regexp');

var MdFigCaption = Plugin(
    /~\[([^\]]*)\]\(([^\)]*)\)/,
    function(match, utils) {
        var caption = match[1];
        var url = match[2];
        console.log('img stuff: ', caption, url, match);
        
        //TODO: is there a safer way to do this? I unno...
        var html = '<figure><img src="' + url + '" /><figcaption>' + caption + '</figcaption></figure>';

        return html;
    }
);

module.exports = MdFigCaption;
