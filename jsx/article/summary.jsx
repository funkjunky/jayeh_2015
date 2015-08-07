var React = require('react');

var ArticleSummary = React.createClass({
    render: function() {
        return (
            <div style={{paddingTop: 20, paddingBottom: 20, marginBottom: 'solid 1px black'}}>
                <a href={'/article/t/'+this.props.article.title}><h3>{this.props.article.header}</h3></a>
                <p>{this.props.article.body}</p>
            </div>
        )
    },
});

module.exports = ArticleSummary;
