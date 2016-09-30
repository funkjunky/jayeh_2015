import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import { data } from '../../helpers/destructurer.jsx';
import FullArticle from '../../routes/article/full.jsx';

class Data_FullArticle extends React.Component {
    componentWillMount() {
        if(!this.props.params.id && !this.props.params.title)
            throw 'Neither title nor id were given to Data_FullArtile';

        let url = '/api/article';
        if(this.props.params.id)
            url += '/' + this.props.params.id;
        else
            url += '?title=' + this.props.params.title;

        Request('get', '/api/article/' + this.props.params.id).end((err, response) => {
            console.log('article response: ', response);
            this.props.dispatch({
                type: 'data_article',
                article: response.body,
            });
        });
    }

    render({ articles }) {
        const index = (this.props.params.id)
            ? articles.findIndex((article) => article.id === this.props.params.id)
            : articles.findIndex((article) => article.title === this.props.params.title);

        return <FullArticle article={articles[index]} />
    }
};

export default connect(data)(Data_FullArticle);
