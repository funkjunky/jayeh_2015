//DEPRECATED: TODO: use basic summary
var React = require('react');
var Jayehmd = require('../../helpers/jayehmd');

var ArticleSummary = React.createClass({displayName: "ArticleSummary",
    render: function() {
        var md = Jayehmd(this.props.article);
        //ya... i have to do this twice until i fix the first time bug.
        var headerMarkup = md.renderTokens(this.props.article.header);
        //
        var headerMarkup = md.renderTokens(this.props.article.header);
        var truncatedBody = this.props.article.body.substr(0,80) + '...';
        return (
            React.createElement("div", {style: {paddingTop: 20, paddingBottom: 20, marginBottom: 'solid 1px black'}}, 
                React.createElement("a", {href: '/article/t/'+this.props.article.title, style: {fontSize: 20, margin: 20}}, {headerMarkup}), 
                React.createElement("p", {style: {fontSize: 14, margin: 20, lineHeight: '150%'}}, {truncatedBody})
            )
        )
    },
});

module.exports = ArticleSummary;
