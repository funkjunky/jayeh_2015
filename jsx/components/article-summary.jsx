var React = require('react');
var StateShortcuts = require('../mixins/stateshortcuts');

var BasicSummary = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            hovered: false,
        };
    },
    render: function() {
        var style = {
            width: '100%',
            height: '100%',
            color: (this.props.whitetext)?'white':'black',
            backgroundImage: 'url(' + this.props.image + ')',
            backgroundSize: '100%',
        };
        var titleEm = '3em';
        var subtitleDisplay = 'none';
        if(this.state.hovered) {
            titleEm = '2em';
            subtitleDisplay = 'block';
        }
        return (
            <div style={style} onMouseEnter={this.toggleState('hovered')} onMouseLeave={this.toggleState('hovered')}>
                <p style={{fontSize: titleEm}}>{this.props.title}</p>
                <p style={{fontSize: '1em', display: subtitleDisplay}}>{this.props.subtitle}</p>
            </div>
        );
    }
});

module.exports = BasicSummary;
