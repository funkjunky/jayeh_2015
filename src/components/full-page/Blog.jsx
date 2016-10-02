import React from 'react';
import { connect } from 'react-redux';

import { data } from '../helpers/destructurer.jsx';
import ArticleSummary from '../components/ArticleSummary.jsx';

const Blog = ({ articles }) => (
    <div>
        <span style={{fontFamily: 'Baskerville', fontSize: 36, paddingRight: 10, paddingLeft: 10, borderRight: "solid 2px grey", borderBottom: "solid 2px grey"}}>Blog</span>
        {articles.map(function(article) {
            return (
                <div style={{marginLeft: '5%', maxWidth: 800, height: 120}}>
                    <ArticleSummary article={article} />
                </div>
            );
        })}
    </div>
);

export default connect(data)(Blog);
