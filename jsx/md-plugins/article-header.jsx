//TODO: KEEP THIS: as an example.
var React = require('react');
var Plugin = require('markdown-it-regexp');
var ArticleHeader = require('../components/article-header');

var MdArticleHeader = Plugin(
    /\[ArticleHeader image=\“(.*?)\”\](.*?)\[\/ArticleHeader\]/g,
    function(match, utils) {
        return (
            <ArticleHeader image={match[1]}>
                {match[2]}
            </ArticleHeader>
        );
    }
);

module.exports = MdArticleHeader;
