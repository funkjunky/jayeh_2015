var React = require('react');
var Superagent = require('superagent');
var MarkdownIt = require('markdown-it');

var SerializeForm = require('../helpers/serializeform');
var StateShortcuts = require('../mixins/stateshortcuts');
var Filedrop = require('react-filedrop');

var MarkdownRegexp = require('markdown-it-regexp');
var MdHighlight = require('markdown-it-highlightjs');
var MdVariables = require('mdvariables');
var MdFigCaption = require('mdfigcaption');
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
            md.use(MdReact);
            md.use(MdHighlight);
            md.use(MdVariables(function() {
                return self.state;
            }));
            md.use(MdFigCaption);
        var headerMarkup = md.renderTokens(this.state.header);
        var bodyMarkup = md.renderTokens(this.state.body);

        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <input type="text" name="title" onChange={this.setStateAsInput('title')} /><br />
                        <Filedrop handleFile={this.handleFile}>
                            <textarea className="dropZone" name="header" style={{width: 800, height: 150}} value={this.state.header} onChange={this.setStateAsInput('header')} onDrop={this.handleDrop} onDragOver={this.preventDefault} /><br />
                        </Filedrop>
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
        document.addEventListener('dragenter', function(event) {
            console.log('drag started: ', document.querySelectorAll('.dropZone'));
            var dropZones = document.querySelectorAll('.dropZone');
            for(var i=0; i!=dropZones.length; ++i) {
                this.backgroundColor = dropZones[i].style.backgroundColor;
                dropZones[i].style.backgroundColor = 'yellow';
            }
        }, false);
        document.addEventListener('dragleave', function(event) {
            console.log('drag ended: ', this.backgroundColor);
            var dropZones = document.querySelectorAll('.dropZone');
            for(var i=0; i!=dropZones.length; ++i)
                dropZones[i].style.backgroundColor = this.backgroundColor;
        }, false);
    },

    preventDefault: function(e) {
        e.preventDefault();
    },

/*
    dragEnter: function(e) {
        e.preventDefault();
        console.log('wtsgfdgf');
        this.backgroundColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = 'green';
        event.stopPropagation();
    },
    dragLeave: function(e) {
        console.log('backgroundcolor: ', this.backgroundColor);
        e.target.style.backgroundColor = this.backgroundColor;
        event.stopPropagation();
    },
    */

    handleDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        function splice(text, splice, pos) {  return text.slice(0, pos) + splice + text.slice(pos); }

        var carPos = e.target.selectionStart;
        console.log('caret: ', carPos);

        this.uploadFile(e, function(err, response) {
            console.log('err, response: ', err, response);
            this.setState({header: splice(this.state.header, response.body.url, carPos)});
        }.bind(this));

    },

    uploadFile: function(event, cb) {
        var dt = event.dataTransfer;
        var files = dt.files;

        Superagent
            .post('/api/__file/images')
            .attach('image', files[0])
            .end(cb);
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
