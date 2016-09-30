import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import { data } from '../../helpers/destructurer.jsx';
import EditArticle from '../../routes/article/edit.jsx';

class Data_EditArticle extends React.Component {
    componentWillMount() {
        Request('get', '/api/article/' + this.props.params.id).end((err, response) => {
            console.log('article response: ', response);
            this.props.dispatch({
                type: 'data_article',
                article: response.body,
            });
        });
    }

    render({ articles }) {
        const index = articles.findIndex((article) => article.id === this.props.params.id);

        return <EditArticle article={articles[index]} />
    }
};

export default connect(data)(Data_EditArticle);
