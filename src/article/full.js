var React = require('react');
var Request = require('superagent');

var Jayehmd = require('../helpers/jayehmd');

var Comments = require('../comments');

var FullArticle = React.createClass({displayName: "FullArticle",
    getInitialState: function() {
        return {article: {title: '', header: '', body: ''}};
    },
    componentDidMount: function() {
        var url = '/api/article';
        if(this.props.id)
            url += '/' + this.props.id;
        else if(this.props.title)
            url += '?title=' + this.props.title;

        this.setState({article: {title: '-', header: '-', body: '-'}});
        Request('get', url).end(function(err, response) {
            console.log('response: ', response);
            this.setState({article: response.body});
        }.bind(this));
    },
    render: function() {
        var md = Jayehmd(this.state.article);
        var headerMarkup = md.renderTokens(this.state.article.header);
        var bodyMarkup = md.renderTokens(this.state.article.body);

        return (
            React.createElement("div", null, 
                React.createElement("a", {href: '/article/t/'+this.state.article.title, style: {fontSize: 20, margin: 20}}, headerMarkup), 
                React.createElement("p", {style: {fontSize: 14, margin: 20, lineHeight: '200%'}}, bodyMarkup), 
                React.createElement(Comments, {article: this.state.article})
            )
        )
    },
});

module.exports = FullArticle;
