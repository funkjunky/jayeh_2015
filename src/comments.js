var React = require('react');
var Superagent = require('superagent');

var Comment = require('./comment');
var AddComment = require('./addcomment');

var Comments = React.createClass({displayName: "Comments",
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
            React.createElement("div", null, 
                comments.map(function(comment) {
                    return React.createElement(Comment, {comment: comment})
                }), 
                React.createElement(AddComment, {article: this.props.article})
            )
        );
    },
});

module.exports = Comments;
