import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import { data } from '../../helpers/destructurer.jsx';
import FullArticle from '../full-page/FullArticle.jsx';
import { loadArticleById, loadArticleByTitle } from '../../actions/Article.jsx';
import { loadComments } from '../../actions/Comment.jsx';

class FullArticleContainer extends React.Component {
    componentWillMount() {
        if(!this.props.params.id && !this.props.params.title)
            throw 'Neither title nor id were given to Data_FullArtile';

        if(this.props.params._id)
            loadArticleById(this.props.params._id);
        else
            loadArticleByTitle(this.props.params.title);

        loadComments(this.props.params._id);

        User.initialize();
    }

    render({ article, comments }) {
        if(article && comments)
            return <FullArticle article={article} comments={comments} />
        else
            return <div>Loading...</div>
    }
};

//We have to connect the correct article to the articleContainer
export default connect(({ data }, { params }) => {
    const index = (params._id)
        ? data.articles.findIndex((article) => article.id === params._id)
        : data.articles.findIndex((article) => article.title === params.title);

    return {
        article: data.articles[index],
        comments: data.comments[params._id]
    };
})(FullArticleContainer);
