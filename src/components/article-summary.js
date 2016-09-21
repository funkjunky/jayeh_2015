var React = require('react');
var StateShortcuts = require('../mixins/stateshortcuts');
var FormatDate = require('../helpers/format-date');

var BasicSummary = React.createClass({displayName: "BasicSummary",
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
        };
    },
    render: function() {
        var style = {
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(\'' + this.props.article.image + '\')',
            backgroundSize: '100%',
            fontFamily: 'Open Sans',
            border: '1px dashed maroon',
            marginTop: '5px',
            marginBottom: '5px',
        };
        return (
            React.createElement("a", {href: "/article/t/" + this.props.article.title, className: "blackReadable"}, React.createElement("div", {style: style}, 
                React.createElement("p", {style: {fontSize: '2em'}}, this.props.article.title), 
                React.createElement("p", {style: {fontSize: '1em', marginLeft: '4em'}}, this.props.article.subtitle), 
                React.createElement("p", {style: {position: 'absolute', right: 0, bottom: 0}}, "Created On: ", FormatDate(this.props.article.created_at))
            ))
        );
    }
});

module.exports = BasicSummary;
