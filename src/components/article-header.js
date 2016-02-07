var React = require('react');

var ArticleHeader = React.createClass({displayName: "ArticleHeader",
    render: function() {
        var style = {
            minHeight: '100vh', //this makes the image take the entire screen height, but allow scrolling past

            backgroundImage: 'url(' + this.props.image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            textAlign: 'center',
            fontFamily: 'Raleway',
        };
        return (
            React.createElement("div", {style: style}, 
               this.props.children
            )
        );
    }
});

module.exports = ArticleHeader;
