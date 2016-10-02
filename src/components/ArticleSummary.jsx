import React from 'react';
import StateShortcuts from '../mixins/stateshortcuts.jsx';
import formatDate from '../helpers/formatDate.jsx';

var BasicSummary = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var style = {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(\'' + this.props.article.image + '\')',
            backgroundSize: '100%',
            fontFamily: 'Open Sans',
            border: '1px dashed maroon',
            marginTop: '5px',
            marginBottom: '5px',
        };
        return (
            <a href={"/article/t/" + this.props.article.title} className="blackReadable"><div style={style}>
                <p style={{fontSize: '2em'}}>{this.props.article.title}</p>
                <p style={{fontSize: '1em', marginLeft: '4em'}}>{this.props.article.subtitle}</p>
                <p style={{position: 'absolute', right: 0, bottom: 0}}>Created On: {formatDate(this.props.article.created_at)}</p>
            </div></a>
        );
    }
});

export default BasicSummary;
