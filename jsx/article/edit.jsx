var React = require('react');
var Superagent = require('superagent');

var Jayehmd = require('../helpers/jayehmd');
var SerializeForm = require('../helpers/serializeform');
var StateShortcuts = require('../mixins/stateshortcuts');
var Filedrop = require('react-filedrop');

var EditArticle = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            title: ' ',
            header: ' ',
            body: ' ',
        };
    },
    render: function() {
        var md = Jayehmd(this.state);

        console.log('header: ', this.state.header);
        var headerMarkup = md.renderTokens(this.state.header);
        var bodyMarkup = md.renderTokens(this.state.body);

        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <input type="text" name="title" value={this.state.title} onChange={this.setStateAsInput('title')} /><br />
                        <Filedrop handleFile={this.handleFile}>
                            <textarea className="dropZone" name="header" style={{width: 800, height: 150}} value={this.state.header} onChange={this.setStateAsInput('header')} onDrop={this.handleDrop} onDragOver={this.preventDefault} /><br />
                        </Filedrop>
                        {headerMarkup}
                        <textarea name="body" style={{width: 800, height: 250}} value={this.state.body} onChange={this.setStateAsInput('body')} /><br />
                        <input type="submit" />
                        {bodyMarkup}
                    </form>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        if(this.props.id)
            this.fetchArticle(this.props.id);

        this.addEvents();
    },

    fetchArticle: function(id) {
        this.setState({title: '-', header: '-', body: '-'});
        Superagent('get', '/api/article/' + id).end(function(err, response) {
            console.log('response: ', response);
            this.setState({
                title: response.body.title,
                header: response.body.header,
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
