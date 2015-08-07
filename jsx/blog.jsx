var React = require('react');
var Request = require('superagent');

var ArticleSummary = require('./article/summary');

var Blog = React.createClass({
    getInitialState: function() {
        return {articles: []};
    },
    componentDidMount: function() {
        Request('get', '/api/article').end(function(err, response) {
            console.log('response: ', response);
            this.setState({articles: response.body});
        }.bind(this));
    },
    render: function() {
        console.log('rendering: ', this.state);
        return (
            <div>
                <h2>Blog</h2>
                {this.state.articles.map(function(article) {
                    return <ArticleSummary article={article} />;
                })};
            </div>
        );
    },
});

module.exports = Blog;
