var React = require('react');
var Superagent = require('superagent');

var User = require('./helpers/user');
var SerializeForm = require('./helpers/serializeform');

var Login = React.createClass({displayName: "Login",
    render: function() {
        return (
            React.createElement("form", {onSubmit: this.login}, 
                React.createElement("input", {type: "text", name: "username"}), 
                React.createElement("input", {type: "password", name: "password"}), 
                React.createElement("input", {type: "submit", value: "Login"})
            )
        );
    },
    login: function(event) {
        event.preventDefault();
        console.log('Logging in...');
        var formJson = SerializeForm(event.target);
        
        User.login(formJson, function(err, response) {
            console.log('post /api/login, response: ', response);
            var user = JSON.parse(response.text);
            console.log('user: ', user);
            window.location.replace('/user/' + user.username);           
        });
    },
});

module.exports = Login;
