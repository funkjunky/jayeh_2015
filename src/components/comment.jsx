import React from 'react';

const Comment = ({ comment }) => (
    <div style={{margin: 10, backgroundColor: (comment.onlyLocal)?'gray':'none'}}>
        <p style={{fontSize: 14}}>{comment.user.username}</p>
        <p style={{fontSize: 12}}>{comment.body}</p>
    </div>
);

export default Comment;
