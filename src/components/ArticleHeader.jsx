import React from 'react';

class ArticleHeader extends React.Component {
    constructor(props) {
        super(props);
        if(typeof window !== 'undefined' && props.video) {
            document.addEventListener('scroll', (e) => {
                const rect = this.refs.articleHeader.getBoundingClientRect()
                if(rect.top < rect.height && rect.top > -rect.height && this.refs.bgvid.paused)
                    this.refs.bgvid.play();               
                else if(!this.refs.bgvid.paused)
                    this.refs.bgvid.pause();               
            });
        }
    }

    render() {
        
        var style = {
            position: 'relative',
            minHeight: '100vh', //this makes the image take the entire screen height, but allow scrolling past
            overflow: 'hidden',

            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            textAlign: 'center',
            fontFamily: 'Open Sans',
        };
        var videoStyle = {
            position: 'absolute',
            top: '50%',
            zIndex: -1,
            minHeight: '100vh',
            minWidth: '100vw',
            transform: 'translateX(-50%) translateY(-50%)',
            backgroundImage: 'url(\'' + this.props.image + '\')',
            backgroundSize: 'cover',
        };
        if(this.props.video)
            return (
                <div ref='articleHeader' style={style} className="blackReadable">
                    { this.props.children } 
                    <video src={ this.props.video } style={ videoStyle } autoPlay muted loop poster={this.props.image} ref="bgvid" />
                </div>
            );
        else
            return (
                <div style={{...style, backgroundImage: 'url(\'' + this.props.image + '\')'}}>
                    { this.props.children } 
                </div>
            );
    }
};

export default ArticleHeader;
