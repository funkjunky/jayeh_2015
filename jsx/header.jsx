var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <div style={{width: '100%'}}>
                <h1>Jayeh.ca</h1>
                <h2>Pro Frisbee Catcher<i class="fa fa-github"></i></h2>
                <a href="https://github.com/funkjunky">Github</a>
            </div>
        );
    },
});

module.exports = Header;
