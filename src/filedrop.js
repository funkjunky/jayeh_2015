var React = require('react');
var Superagent = require('superagent');

var Filedrop = React.createClass({displayName: "Filedrop",
    render: function() {
        return (
            React.createElement("div", {className: "dropZone", onDrop: this.handleDrop, onDragOver: this.preventDefault, onDragEnter: this.preventDefault, onDragLeave: this.preventDefault}, 
                this.props.children
            )
        );
    },
});

module.exports = Filedrop
