import React from 'react';
import formatDate from '../helpers/formatDate.jsx';

import Link from 'react-router';

const ArticleSummary = ({article}) => (
    <Link to={"/article/t/${this.props.article.title"} className="blackReadable"><div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(\'' + article.image + '\')',
        backgroundSize: '100%',
        fontFamily: 'Open Sans',
        border: '1px dashed maroon',
        marginTop: '5px',
        marginBottom: '5px',
    }}>
        <p style={{fontSize: '2em'}}>{article.title}</p>
        <p style={{fontSize: '1em', marginLeft: '4em'}}>{article.subtitle}</p>
        <p style={{position: 'absolute', right: 0, bottom: 0}}>Created On: {formatDate(article.created_at)}</p>
    </div></Link>
);

export default ArticleSummary;
