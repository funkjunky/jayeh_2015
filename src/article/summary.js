var React = require('react');

var ArticleSummary = React.createClass({displayName: "ArticleSummary",
    render: function() {
        return (
            React.createElement("div", {style: {paddingTop: 20, paddingBottom: 20, marginBottom: 'solid 1px black'}}, 
                React.createElement("a", {href: '/article/t/'+this.props.article.title, style: {fontSize: 20, margin: 20}, dangerouslySetInnerHTML: {__html: this.props.article.header}}), 
                React.createElement("p", {style: {fontSize: 14, margin: 20, lineHeight: '150%'}, dangerouslySetInnerHTML: {__html: this.props.article.body}})
            )
        )
    },
});

module.exports = ArticleSummary;
