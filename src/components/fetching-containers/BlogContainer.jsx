import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import Blog from '../full-page/Blog.jsx';
import { loadArticles } from '../../actions/Article.jsx';

const BlogContainer = ({ loadArticles }) => {
        loadArticles();
        return <Blog />;
};

export default connect(null, { loadArticles })(BlogContainer);
