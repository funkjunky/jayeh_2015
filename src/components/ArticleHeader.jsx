import React from 'react';

var ArticleHeader = React.createClass({
    render: function() {
        var style = {
            position: 'relative',
            minHeight: '100vh', //this makes the image take the entire screen height, but allow scrolling past

            //backgroundImage: 'url(\'' + this.props.image + '\')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            textAlign: 'center',
            fontFamily: 'Open Sans',
        };
        var videoStyle = {
            position: 'absolute',
            top: 0,
            zIndex: -1,
            minHeight: '100vh',
            //minWidth: '100vh',
            transform: 'translateX(-50%)',
            backgroundImage: 'url(\'' + this.props.image + '\')',
            backgroundSize: 'cover',
        };
        if(this.props.video)
            return (
                <div style={style}>
                    { this.props.children } 
                    <video src={ this.props.video } style={ videoStyle } autoPlay muted loop poster={this.props.image} id="bgvid" />
                </div>
            );
        else
            return (
                <div style={style}>
                    { this.props.children } 
                </div>
            );
    }
});

export default ArticleHeader;
