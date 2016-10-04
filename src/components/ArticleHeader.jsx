import React from 'react';

var ArticleHeader = React.createClass({
    render: function() {
        var style = {
            minHeight: '100vh', //this makes the image take the entire screen height, but allow scrolling past

            backgroundImage: 'url(\'' + this.props.image + '\')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            textAlign: 'center',
            fontFamily: 'Open Sans',
        };
        return (
            <div style={style}>
               {this.props.children} 
            </div>
        );
    }
});

export default ArticleHeader;