import React from 'react';

class ArticleHeader extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener('scroll', (e) => {
            const rect = this.refs.articleHeader.getBoundingClientRect()
            if(rect.top < rect.height && rect.top > -rect.height)
                this.refs.bgvid.play();               
            else
                this.refs.bgvid.pause();               
        });
    }

    render() {
        
        var style = {
            position: 'relative',
            minHeight: '100vh', //this makes the image take the entire screen height, but allow scrolling past

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
            transform: 'translateX(-50%)',
            backgroundImage: 'url(\'' + this.props.image + '\')',
            backgroundSize: 'cover',
        };
        if(this.props.video)
            return (
                <div ref='articleHeader' style={style}>
                    { this.props.children } 
                    <video src={ this.props.video } style={ videoStyle } autoPlay muted loop poster={this.props.image} ref="bgvid" />
                </div>
            );
        else
            return (
                <div ref='articleHeader' style={{...style, backgroundImage: 'url(\'' + this.props.image + '\')'}}>
                    { this.props.children } 
                </div>
            );
    }
};

export default ArticleHeader;
