import React from 'react';
import Superagent from 'superagent';

import Comment from './comment.jsx';
import AddComment from './addcomment.jsx';

var Comments = React.createClass({
    getInitialState: function() {
        return {comments: []};
    },
    componentDidMount: function() {
        //TODO: use sockets or something instead...
        this.getComments();
        setInterval(function() {
            this.getComments();
        }.bind(this), 20000);
    },
    getComments: function() {
        Superagent.get('/api/comment?article_id=' + this.props.article._id).end(function(err, response) {
            console.log('comments response: ', response.body);
            this.setState({comments: response.body});
        }.bind(this));
    },
    //TODO: dynamically manage comments live... perhaps using my generic rest server and sockets?
    render: function() {
        var comments = this.state.comments || [];
        return (
            <div>
                {comments.map(function(comment) {
                    return <Comment comment={comment} />
                })}
                <AddComment article={this.props.article} />
            </div>
        );
    },
});

export default Comments;
