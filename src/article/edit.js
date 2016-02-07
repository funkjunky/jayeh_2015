var React = require('react');
var Superagent = require('superagent');

var Jayehmd = require('../helpers/jayehmd');
var SerializeForm = require('../helpers/serializeform');
var StateShortcuts = require('../mixins/stateshortcuts');
var Filedrop = require('react-filedrop');

var EditArticle = React.createClass({displayName: "EditArticle",
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            title: ' ',
            summary: ' ',
            body: ' ',
        };
    },
    render: function() {
        var md = Jayehmd(this.state);

        console.log('summary: ', this.state.summary);
        var summaryMarkup = md.renderTokens(this.state.summary);
        var bodyMarkup = md.renderTokens(this.state.body);

        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Edit Article"), 
                React.createElement("div", null, 
                    React.createElement("form", {onSubmit: this.saveArticle, ref: "myform"}, 
                        React.createElement("input", {type: "text", name: "title", value: this.state.title, onChange: this.setStateAsInput('title')}), React.createElement("br", null), 
                        React.createElement(Filedrop, {handleFile: this.handleFile}, 
                            React.createElement("textarea", {className: "dropZone", name: "summary", style: {width: 800, height: 150}, value: this.state.summary, onChange: this.setStateAsInput('summary'), onDrop: this.handleDrop, onDragOver: this.preventDefault}), React.createElement("br", null)
                        ), 
                        React.createElement("div", {style: {width: 600, height: 200}}, summaryMarkup), 
                        React.createElement("textarea", {name: "body", style: {width: 800, height: 250}, value: this.state.body, onChange: this.setStateAsInput('body')}), React.createElement("br", null), 
                        React.createElement("input", {type: "submit"}), 
                        bodyMarkup
                    )
                )
            )
        );
    },

    componentDidMount: function() {
        if(this.props.id)
            this.fetchArticle(this.props.id);

        this.addEvents();
    },

    fetchArticle: function(id) {
        this.setState({title: '-', summary: '-', body: '-'});
        Superagent('get', '/api/article/' + id).end(function(err, response) {
            console.log('response: ', response);
            this.setState({
                title: response.body.title,
                summary: response.body.summary,
                body: response.body.body,
            });
        }.bind(this));
    },

    addEvents: function() {
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

    handleDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        function splice(text, splice, pos) {  return text.slice(0, pos) + splice + text.slice(pos); }

        var carPos = e.target.selectionStart;
        console.log('caret: ', carPos);

        this.uploadFile(e, function(err, response) {
            console.log('err, response: ', err, response);
            this.setState({summary: splice(this.state.summary, response.body.url, carPos)});
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
