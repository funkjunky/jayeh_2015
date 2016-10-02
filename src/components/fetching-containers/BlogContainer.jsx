import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import Blog from '../full-page/Blog.jsx';

class BlogContainer extends React.Component {
    componentWillMount() {
        Request('get', '/api/article').end((err, response) => {
            console.log('response: ', response);
            this.props.dispatch({
                type: 'data_articles',
                articles: response.body,
            });
        });
    }

    render() {
        return <Blog /> 
    }
};

export default connect()(BlogContainer);
