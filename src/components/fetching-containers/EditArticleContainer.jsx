import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import { loadArticleById } from '../../actions/Article.jsx';
import EditArticle from '../full-page/EditArticle.jsx';

class EditArticleContainer extends React.Component {
    componentWillMount() {
        this.props.loadArticlesById(this.props.params.id);
    }

    render({ article }) {
        return <EditArticle article={articles} />
    }
};

//We have to connect the correct article to the articleContainer
export default connect(({ data }, { params }) => {
    const index = data.articles.findIndex((article) => article.id === params._id);

    return {
        article: data.articles[index],
    };
}, { loadArticleById })(EditArticleContainer);
