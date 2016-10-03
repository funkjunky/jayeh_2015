import React from 'react';

import Jayehmd from '../../helpers/jayehmd.jsx';
import Comments from '../Comments.jsx';
import ArticleHeader from '../ArticleHeader.jsx';
import formatDate from '../../helpers/formatDate.jsx';
import AddComment from './AddComment.jsx';

var FullArticle = ({ article, comments, user }) => {
    var md = Jayehmd(article);
    var headerMarkup = md.renderTokens(article.header);
    var bodyMarkup = md.renderTokens(article.body);

    return (
        <div>
            <ArticleHeader image={article.image}>{headerMarkup}</ArticleHeader>
            <div id="blog-body" style={{fontSize: 14, maxWidth: '40em', margin: 'auto', lineHeight: '200%'}}>
                {bodyMarkup}
            </div>
            <p>Created On: {formatDate(article.created_at)} - Edited On: {formatDate(article.edited_at)}</p>
            <Comments comments={comments} />
            <AddComment articleId={article._id} />
        </div>
    )
};

export default FullArticle;
