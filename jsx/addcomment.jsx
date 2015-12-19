var React = require('react');
var Superagent = require('superagent');

var User = require('./helpers/user');
var SerializeForm = require('./helpers/serializeform');

var AddComment = React.createClass({
    initialize: false, //TODO: so hacky...
    componentDidMount: function() {
        //TODO: this is scarppy... i dont know how to do this nicely.
        User.initialize();
        this.initialize = true;
    },
    render: function() {
        if(this.initialize && !User.authenticated())   //TODO: allow more ways to login.
            return <button type="button">Login to comment</button>
        else if(this.initialize)
            var user_id = User.currentUser()._id;

        var placeholders = [
            'I promise I\'ll read this comment... eventually. ...maybe.',
            'Please voice your incorrect opinion.',
            'You want to comment what? How rude.',
            'Please post all your ideas here and I well make millions of them, then send you bran muffins in appreciation.',
        ];
        var placeholder = placeholders[Math.floor(Math.random * placeholders.length)];

        return (
            <div style={{margin: 20}}>
                <form method="post" action="/api/comment" onSubmit={this.onSubmit}>
                    <textarea name="body" placeholder={placeholder} style={{width: 800, height: 150}} />
                    <input type="hidden" name="user_id" value={user_id} />
                    <input type="hidden" name="article_id" value={this.props.article._id} /><br />
                    <input type="submit" value="Post Comment" />
                </form>
            </div>
        );
    },

    onSubmit: function(event) {
        var form = event.target;
        var formJson = SerializeForm(form);

        Superagent.post('/api/comment').send(formJson).end(function(err, response) {
            if(err)
                console.log(err);
            else
                form.reset();
        });

        event.stopPropagation();
        event.preventDefault();
    },
});

module.exports = AddComment;
