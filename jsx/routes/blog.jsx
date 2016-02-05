var React = require('react');
var Request = require('superagent');

//TODO: use Basic-Summary instead
//var ArticleSummary = require('./article/summary');
var BasicSummary = require('../components/basic-summary');

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
        return (
            <div>
                <span style={{fontFamily: 'Baskerville', fontSize: 36, paddingRight: 10, paddingLeft: 10, borderRight: "solid 2px grey", borderBottom: "solid 2px grey"}}>Blog</span>
                {this.state.articles.map(function(article) {
                    return <BasicSummary title={article.title} subtitle={article.subtitle} />;
                })}
            </div>
        );
    },
});

module.exports = Blog;
