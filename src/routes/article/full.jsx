import React from 'react';

import Jayehmd from '../../helpers/jayehmd.jsx';
import Comments from '../../components/comments.jsx';
import ArticleHeader from '../../components/article-header.jsx';
import FormatDate from '../../helpers/format-date.jsx';

var FullArticle = ({ article }) => {
    var md = Jayehmd(article);
    var headerMarkup = md.renderTokens(article.header);
    var bodyMarkup = md.renderTokens(article.body);

    return (
        <div>
            <ArticleHeader image={article.image}>{headerMarkup}</ArticleHeader>
            <div id="blog-body" style={{fontSize: 14, maxWidth: '40em', margin: 'auto', lineHeight: '200%'}}>
                {bodyMarkup}
            </div>
            <p>Created On: {FormatDate(article.created_at)} - Edited On: {FormatDate(article.edited_at)}</p>
            <Comments article={article} />
        </div>
    )
};

export default FullArticle;
