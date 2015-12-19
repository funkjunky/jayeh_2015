var Superagent = require('superagent');

var User = {
    _user: null,
    authenticated: function() {
        return this.currentUser() != null;
    },
    //If next is provided, then next is responsible for handling the error
    login: function(credentials, next) {
        return Superagent.post('/api/login').send({
            username: credentials.username,
            password: credentials.password,
        }).end(function(err, response) {
            if(!err)
                this._user = response.body[0];

            if(next)
                next(err, response);

            if(err)
                throw Error(err);
        });
    },
    logout: function() {
        return Superagent('get', '/api/logout');
    },
    currentUser: function() {
        this.initialize();
        return this._user;
    },
    //Note, this returns a promise. to use it:
    //  user.getUser('jason').end(function(err, response) { this.setState({user: response.body[0]}); }.bind(this));
    getUser: function(user) {
        if(this._user && user == this._user.username)
            return {end: function(fnc) { fnc(null, {body: [this.currentUser()]}); }};
        else
            return Superagent('get', '/api/users?username=' + user);
    },

    //to see if im logged in, initially.
    initialize: function() {
        if(!this._ready) {
            this._ready = true;
            Superagent('get', '/api/user').end(function(err, response) {
                this._user = response.body;
            }.bind(this));
        }
    },
};

module.exports = User;
