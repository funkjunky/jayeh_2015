var React = require('react');
var Superagent = require('superagent');

var SerializeForm = require('../helpers/serializeform');

var EditArticle = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <input type="text" name="title" /><br />
                        <textarea name="header" defaultValue={'yoyo'} /><br />
                        <textarea name="body" /><br />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        console.log('did mount');
    },

    saveArticle: function(event) {
        event.preventDefault();
        console.log('Save Article');
        var formJson = SerializeForm(event.target);
        Superagent.post('/api/article').send(formJson).end(function(err, response) {
            console.log('post /api/article, response: ', response.body);
        });
    },
});

module.exports = EditArticle;
