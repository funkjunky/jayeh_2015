import React from 'react';
import { connect } from 'react-redux';
import Title from 'react-title-component';

import Jayehmd from '../../helpers/jayehmd.jsx';
import Comments from '../Comments.jsx';
import ArticleHeader from '../ArticleHeader.jsx';
import formatDate from '../../helpers/formatDate.jsx';
import AddComment from '../AddComment.jsx';

const FullArticle = ({ article, user }) => {
    var md = Jayehmd(article);
    var headerMarkup = md.renderTokens(article.header);
    var bodyMarkup = md.renderTokens(article.body);

    let ret = (
        <div>
            <Title render={(prevTitle) => prevTitle + ' - ' + article.title} />
            <ArticleHeader image={article.image} video={article.video}>{headerMarkup}</ArticleHeader>
            <div id="blog-body" style={{fontSize: 14, maxWidth: '40em', margin: 'auto', lineHeight: '200%'}}>
                {bodyMarkup}
            </div>
            <p>Created On: {formatDate(article.created_at)} - Edited On: {formatDate(article.updated_at)}</p>
            <Comments articleId={article._id} />
            <AddComment articleId={article._id} />
        </div>
    );
    return ret;
};

export default connect()(FullArticle);
