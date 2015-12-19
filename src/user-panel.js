var React = require('react');
var Superagent = require('superagent');

var User = require('./helpers/user');

var UserPanel = React.createClass({displayName: "UserPanel",
    getInitialState: function() {
        return {user: null};
    },
    componentDidMount: function() {
        this.getUser(this.props.username).end(function(err, response) {
            console.log('user page response: ', response);
            this.setState({user: response.body[0]});
        }.bind(this));
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("pre", null, this.state.user), 
                React.createElement("br", null), 
                (this.state.user.username == User.currentUser().username)
                ? React.createElement("a", {href: "/api/logout", onClick: User.logout()}, "Logout") : ''
            )
        );
    },
});

module.exports = UserPanel;
