var React = require('react');
var StateShortcuts = require('./mixins/stateshortcuts');

var ParallexHeader = React.createClass({displayName: "ParallexHeader",
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            hovered: false,
        };
    },
    render: function() {
        var stuff = this.props.stuff || 'no stuff';
        var style = {};
        if(this.state.hovered)
            style.backgroundColor = 'green';
        return (
            React.createElement("strong", {style: style, onClick: this.whatever, onMouseEnter: this.toggleState('hovered'), onMouseLeave: this.toggleState('hovered')}, stuff, React.createElement("input", {type: "text", ref: "bleh"}))
        );
    },
    whatever: function() {
React.findDOMNode(this.refs.bleh).focus();
},
});

module.exports = ParallexHeader;
