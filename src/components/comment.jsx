import React from 'react';

var Comment = React.createClass({
    render: function() {
        return (
            <div style={{margin: 10}}>
                <p style={{fontSize: 14}}>{this.props.comment.user.username}</p>
                <p style={{fontSize: 12}}>{this.props.comment.body}</p>
            </div>
        );
    },
});

export default Comment;
