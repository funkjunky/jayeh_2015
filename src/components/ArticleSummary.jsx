import React from 'react';
import formatDate from '../helpers/formatDate.jsx';

import { Link } from 'react-router';

//TODO: are refs local? If so, then I should remove the _id concat from the ref
const ArticleSummary = ({article}) => {
    let videoRef;
    let style = {
        position: 'relative',
        width: '100%',
        height: '100%',
        fontFamily: 'Open Sans',
        border: '1px dashed maroon',
        marginTop: '5px',
        marginBottom: '5px',
        overflow: 'hidden',
    }
    if(!article.video)
        style = {...style, ...{
            backgroundImage: 'url(\'' + article.image + '\')',
            backgroundSize: '100%',
        }};
    return (
        <Link to={"/article/t/" + article.title} className="blackReadable"><div style={style} onMouseEnter={e => (videoRef) ? videoRef.play() : true } onMouseLeave={e => (videoRef) ? videoRef.pause() : true }>
            <p style={{fontSize: '2em'}}>{article.title}</p>
            <p style={{fontSize: '1em', marginLeft: '4em'}}>{article.subtitle}</p>
            <p style={{position: 'absolute', right: 0, bottom: 0}}>Created On: {formatDate(article.created_at)}</p>
            {(article.video)
                ?   <video src={article.video} style={{position: 'absolute', zIndex: -1, top: 0, transform: 'translateY(-50%)', width: '100%'}} muted loop preload="auto" ref={(video) => videoRef = video} />
                :   ''}
        </div></Link>
    );
};

export default ArticleSummary;
