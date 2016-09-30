import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import Blog from '../../routes/blog.jsx';

class Data_Blog extends React.Component {
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

export default connect()(Data_Blog);
