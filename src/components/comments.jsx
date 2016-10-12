import React from 'react';
import { connect } from 'react-redux';

import Comment from './Comment.jsx';
import { loadComments } from '../actions/Comments.jsx';

/*
setInterval(function() {
    this.getComments();
}.bind(this), 20000);
*/

//TODO: dynamically manage comments live... perhaps using my generic rest server and sockets?
class Comments extends React.Component {
    componentDidMount() {
        this.props.loadComments(this.props.articleId);
    }

    render() {
        let { comments = [] } = this.props;
        return (
            <div>
                {comments.map(function(comment) {
                    return <Comment key={comment._id} comment={comment} />
                })}
            </div>
        );
    }
};

export default connect(({ data }, { articleId }) => ({ comments: data.comments[articleId] }), { loadComments })(Comments);
