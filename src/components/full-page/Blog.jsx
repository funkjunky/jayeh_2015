import React from 'react';
import { connect } from 'react-redux';
import Title from 'react-title-component';

import ArticleSummary from '../ArticleSummary.jsx';

const Blog = ({ articles }) => (
    <div>
        <Title render={(prevTitle) => prevTitle + ' - Blog'} />
        <span style={{fontFamily: 'Baskerville', fontSize: 36, paddingRight: 10, paddingLeft: 10, borderRight: "solid 2px grey", borderBottom: "solid 2px grey"}}>Blog</span>
        {articles.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).map(function(article) {
            return (
                <div key={article._id} style={{marginLeft: '5%', maxWidth: 800, height: 120}}>
                    <ArticleSummary article={article} />
                </div>
            );
        })}
    </div>
);

export default connect(({data}) => ({ articles: data.articles }))(Blog);
