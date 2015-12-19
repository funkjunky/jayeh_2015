var React = require('react');

var Comment = React.createClass({displayName: "Comment",
    render: function() {
        return (
            React.createElement("div", {style: {margin: 10}}, 
                React.createElement("p", {style: {fontSize: 14}}, this.props.comment.user.username), 
                React.createElement("p", {style: {fontSize: 12}}, this.props.comment.body)
            )
        );
    },
});

module.exports = Comment;
