import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import FullArticle from '../full-page/FullArticle.jsx';
import { loadArticleById, loadArticleByTitle } from '../../actions/Article.jsx';
import { loadComments } from '../../actions/Comments.jsx';

class FullArticleContainer extends React.Component {
    componentWillMount() {
        const { _id, title } = this.props.params;
        if(!_id && !title)
            throw 'Neither title nor id were given to Data_FullArtile';

        if(_id)
            loadArticleById(_id);
        else
            loadArticleByTitle(title);

        loadComments(_id);
    }

    render() {
        const { article, comments } = this.props;
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
