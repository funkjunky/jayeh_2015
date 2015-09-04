var React = require('react');
var Superagent = require('superagent');
var MarkdownIt = require('markdown-it');
var MarkdownRegexp = require('markdown-it-regexp');

var SerializeForm = require('../helpers/serializeform');
var StateShortcuts = require('../mixins/stateshortcuts');

var MdParallexHeader = require('../md-plugins/parallexheader');

var MdReact = require('mdreact');

var EditArticle = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            header: '',
            body: '',
        };
    },
    render: function() {
        var md = new MarkdownIt();
            md.use(MdParallexHeader);
            md.use(MdReact);
        //var headerMarkup = md.render(this.state.header);
        var headerMarkup = md.renderTokens(this.state.header);
        console.log('markup: ', headerMarkup);
        var bodyMarkup = md.render(this.state.body);

        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <input type="text" name="title" /><br />
                        <textarea name="header" style={{width: 800, height: 150}} defaultValue={'use this for loading data'} onChange={this.setStateAsInput('header')} /><br />
                        {headerMarkup}
                        <textarea name="body" style={{width: 800, height: 250}} onChange={this.setStateAsInput('body')} /><br />
                        <input type="submit" />
                        <div dangerouslySetInnerHTML={{__html: bodyMarkup}} />
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
