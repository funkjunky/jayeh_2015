var React = require('react');
var Superagent = require('superagent');

var User = require('../helpers/user');

var UserPanel = React.createClass({
    getInitialState: function() {
        return {user: {}};
    },
    componentDidMount: function() {
        User.getUser(this.props.username).end(function(err, response) {
            console.log('user page response: ', response);
            this.setState({user: response.body[0]});
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <pre>{this.state.user}</pre>
                <br />
                {(this.state.user.username == User.currentUser().username)
                ? <a href="/api/auth/logout" onClick={User.logout}>Logout</a> : ''}
            </div>
        );
    },
});

module.exports = UserPanel;
