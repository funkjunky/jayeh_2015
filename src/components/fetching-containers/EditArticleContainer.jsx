import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import { data } from '../../helpers/destructurer.jsx';
import EditArticle from '../full-page/EditArticle.jsx';

class EditArticleContainer extends React.Component {
    componentWillMount() {
        Request('get', '/api/article/' + this.props.params.id).end((err, response) => {
            console.log('article response: ', response);
            this.props.dispatch({
                type: 'data_articles',
                articles: [response.body],
            });
        });
    }

    render({ articles }) {
        const index = articles.findIndex((article) => article._id === this.props.params._id);

        return <EditArticle article={articles[index]} />
    }
};

export default connect(data)(EditArticleContainer);
