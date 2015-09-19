var React = require('react');

var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("div", {style: {display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', borderBottom: 'solid 2px grey', fontFamily: 'Baskerville'}}, 
                React.createElement("div", null, 
                    React.createElement("h1", {style: {fontSize: 48, textAlign: 'right'}}, "Jayeh.ca"), 
                    React.createElement("h2", {style: {fontSize: 24}}, "Pro Frisbee Guy / Coder ", React.createElement("a", {href: "https://github.com/funkjunky", target: "_blank"}, React.createElement("i", {className: "fa fa-github"})))
                )
            )
        );
    },
});

module.exports = Header;
