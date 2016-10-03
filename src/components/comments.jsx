import React from 'react';
import Superagent from 'superagent';

import Comment from './Comment.jsx';

/*
setInterval(function() {
    this.getComments();
}.bind(this), 20000);
*/

//TODO: dynamically manage comments live... perhaps using my generic rest server and sockets?
var Comments = ({ comments }) => (
    <div>
        {comments.map(function(comment) {
            return <Comment comment={comment} />
        })}
    </div>
);

export default Comments;
