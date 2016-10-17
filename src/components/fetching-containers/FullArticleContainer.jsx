import React from 'react';
import { connect } from 'react-redux';

import FullArticle from '../full-page/FullArticle.jsx';

const FullArticleContainer = ({ article, comments }) => <FullArticle article={article} comments={comments} />

//We have to connect the correct article to the articleContainer
export default connect(({ data }, { params }) => {
    //console.log('length, params: ', data.articles[0].title, params.title);
    const index = (params._id)
        ? data.articles.findIndex((article) => article._id === params._id)
        : data.articles.findIndex((article) => article.title === params.title);

    return {
        article: data.articles[index],
    };
})(FullArticleContainer);
