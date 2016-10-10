import React from 'react';
import { connect } from 'react-redux';

import EditArticle from '../full-page/EditArticle.jsx';

const EditArticleContainer = ({ article }) => {
    if(article)
        return <EditArticle article={articles} />
    else
        return <div>Loading...</div>
};

//We have to connect the correct article to the articleContainer
export default connect(({ data }, { params }) => {
    const index = data.articles.findIndex((article) => article.id === params._id);

    return {
        article: data.articles[index],
    };
})(EditArticleContainer);
