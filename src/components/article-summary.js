var React = require('react');
var StateShortcuts = require('../mixins/stateshortcuts');

var BasicSummary = React.createClass({displayName: "BasicSummary",
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var style = {
            width: '100%',
            height: '100%',
            backgroundImage: 'url(\'' + this.props.article.image + '\')',
            backgroundSize: '100%',
        };
        return (
            React.createElement("a", {href: "/article/t/" + this.props.article.title, className: "blackReadable"}, React.createElement("div", {style: style}, 
                React.createElement("p", {style: {fontSize: '2em'}}, this.props.article.title), 
                React.createElement("p", {style: {fontSize: '1em', marginLeft: '4em'}}, this.props.article.subtitle)
            ))
        );
    }
});

module.exports = BasicSummary;
