var Superagent = require('superagent');

var User = {
    _user: {},
    _ready: false,
    authenticated: function() {
        return this.currentUser() != null;
    },
    //If next is provided, then next is responsible for handling the error
    login: function(credentials, next) {
        return Superagent.post('/api/auth/login').send({
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
        return Superagent('get', '/api/auth/logout');
    },
    currentUser: function() {
        this.initialize();
        console.log('this._user: ', this._user);
        return this._user;
    },
    //Note, this returns a promise. to use it:
    //  user.getUser('jason').end(function(err, response) { this.setState({user: response.body[0]}); }.bind(this));
    getUser: function(user) {
        if(user == this._user.username)
            return {end: function(fnc) { fnc(null, {body: [this.currentUser()]}); }};
        else
            return Superagent('get', '/api/users?username=' + user);
    },

    //to see if im logged in, initially.
    initialize: function() {
        if(!this._ready && !this._loggingIn) {
            this._loggingIn = true;
            Superagent.get('/api/user').end(function(err, response) {
                this._loggingIn = false;
                if(!err) {
                    this._user = response.body;
                    this._ready = true;
                }
            }.bind(this));
        }
    },
};

module.exports = User;
