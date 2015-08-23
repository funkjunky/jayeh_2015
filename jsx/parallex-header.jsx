var React = require('react');
var StateShortcuts = require('./mixins/stateshortcuts');

var ParallexHeader = React.createClass({
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
            <strong style={style} onClick={this.whatever} onMouseEnter={this.toggleState('hovered')} onMouseLeave={this.toggleState('hovered')}>{stuff}<input type="text" ref="bleh" /></strong>
        );
    },
    whatever: function() {
React.findDOMNode(this.refs.bleh).focus();
},
});

module.exports = ParallexHeader;
