var React = require('react');
var StateShortcuts = require('../mixins/stateshortcuts');

var BasicSummary = React.createClass({
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
            <a href={"/article/t/" + this.props.article.title}><div style={style}>
                <p style={{fontSize: '2em'}}>{this.props.article.title}</p>
                <p style={{fontSize: '1em', marginLeft: '4em'}}>{this.props.article.subtitle}</p>
            </div></a>
        );
    }
});

module.exports = BasicSummary;
