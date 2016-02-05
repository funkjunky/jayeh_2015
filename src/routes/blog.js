var React = require('react');
var Request = require('superagent');

//TODO: use Basic-Summary instead
var ArticleSummary = require('./article/summary');

var Blog = React.createClass({displayName: "Blog",
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
            React.createElement("div", null, 
                React.createElement("span", {style: {fontFamily: 'Baskerville', fontSize: 36, paddingRight: 10, paddingLeft: 10, borderRight: "solid 2px grey", borderBottom: "solid 2px grey"}}, "Blog"), 
                this.state.articles.map(function(article) {
                    return React.createElement(ArticleSummary, {article: article});
                })
            )
        );
    },
});

module.exports = Blog;
