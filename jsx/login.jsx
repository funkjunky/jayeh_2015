var React = require('react');

var User = require('./helpers/user');
var SerializeForm = require('./helpers/serializeform');

var Login = React.createClass({
    render: function() {
        return (
            <form onSubmit={this.login}>
                <input type="text" name="username" />
                <input type="password" name="password" />
                <input type="submit" value="Login" />
            </form>
        );
    },
    login: function(event) {
        event.preventDefault();
        console.log('Logging in...');
        var formJson = SerializeForm(event.target);
        
        User.login(formJson, function(err, response) {
            var user = JSON.parse(response.text);
            console.log('user: ', user);
            window.location.replace('/user/' + user.username);           
        });
    },
});

module.exports = Login;
