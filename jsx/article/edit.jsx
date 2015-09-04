var React = require('react');
var Superagent = require('superagent');
var MarkdownIt = require('markdown-it');
var MarkdownRegexp = require('markdown-it-regexp');
var MdHighlight = require('markdown-it-highlightjs');
var MdVariables = require('../md-plugins/mdvariables');
var MdFigCaption = require('../md-plugins/mdfigcaption');

var SerializeForm = require('../helpers/serializeform');
var StateShortcuts = require('../mixins/stateshortcuts');

var MdParallexHeader = require('../md-plugins/parallexheader');

var MdReact = require('mdreact');

var EditArticle = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            title: '',
            header: '',
            body: '',
        };
    },
    render: function() {
        //TODO: put this in an initial function and reuse the object.
        //TODO: better way than using self=this. [note: can't use bind, just incase Plugin needs context]
        var self = this;
        var md = new MarkdownIt();
            md.use(MdParallexHeader);
            md.use(MdReact);
            md.use(MdHighlight);
            md.use(MdVariables(function() {
                return self.state;
            }));
            md.use(MdFigCaption);
        var headerMarkup = md.renderTokens(this.state.header);
        console.log('markup: ', headerMarkup);
        var bodyMarkup = md.render(this.state.body);

        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <input type="text" name="title" onChange={this.setStateAsInput('title')} /><br />
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
