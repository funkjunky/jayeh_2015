//TODO: KEEP THIS: as an example.
import React from 'react';
import Plugin from 'markdown-it-regexp';
import ArticleHeader from '../components/article-header.jsx';

var mdArticleHeader = Plugin(
    /\[ArticleHeader image=\“(.*?)\”\](.*?)\[\/ArticleHeader\]/g,
    function(match, utils) {
        return (
            <ArticleHeader image={match[1]}>
                {match[2]}
            </ArticleHeader>
        );
    }
);

export default mdArticleHeader;
