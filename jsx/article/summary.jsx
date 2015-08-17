var React = require('react');

var ArticleSummary = React.createClass({
    render: function() {
        return (
            <div style={{paddingTop: 20, paddingBottom: 20, marginBottom: 'solid 1px black'}}>
                <a href={'/article/t/'+this.props.article.title} style={{fontSize: 20, margin: 20}} dangerouslySetInnerHTML={{__html: this.props.article.header}}></a>
                <p style={{fontSize: 14, margin: 20, lineHeight: '150%'}} dangerouslySetInnerHTML={{__html: this.props.article.body}}></p>
            </div>
        )
    },
});

module.exports = ArticleSummary;
