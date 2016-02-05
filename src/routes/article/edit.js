var React = require('react');
var Superagent = require('superagent');
//var Filedrop = require('../../components/filedrop')({
var Filedrop = require('react-filedrop')({
    dragStartStyle: {border: 'dashed 1px #00DD00', backgroundColor: '#AAFFAA'},
    dragHoverStyle: {border: 'dashed 2px #0000DD', backgroundColor: '#AAAAFF'},
});

var Jayehmd = require('../../helpers/jayehmd');
var SerializeForm = require('../../helpers/serializeform');
var StateShortcuts = require('../../mixins/stateshortcuts');

var EditArticle = React.createClass({displayName: "EditArticle",
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            title: ' ',
            subtitle: ' ',
            summary: ' ',
            image: '/dist/header3.jpg',
            header: ' ',
            body: ' ',
        };
    },
    render: function() {
        var md = Jayehmd(this.state);

        console.log('summary: ', this.state.summary);
        var summaryMarkup = md.renderTokens(this.state.summary);
        var bodyMarkup = md.renderTokens(this.state.body);

        //TODO: inputs should use a component that gets rid of hte massive redundency, if possible... i just hate writing subtitle 3 times
        return (
            React.createElement("div", null, 
                React.createElement("h2", null, "Edit Article"), 
                React.createElement("div", null, 
                    React.createElement("form", {onSubmit: this.saveArticle, ref: "myform"}, 
                        React.createElement("div", null, 
                            React.createElement("input", {type: "text", name: "title", value: this.state.title, onChange: this.setStateAsInput('title')}), React.createElement("br", null), 
                            React.createElement("input", {type: "text", name: "subtitle", value: this.state.subtitle, onChange: this.setStateAsInput('subtitle')}), React.createElement("br", null), 
                            React.createElement(Filedrop, {handleDrop: this.handleDrop}, 
                                React.createElement("input", {type: "text", name: "image", value: this.state.image, onChange: this.setStateAsInput('image')})
                            )
                        ), 
                        React.createElement(Filedrop, null, 
                            React.createElement("textarea", {name: "summary", style: {width: 800, height: 150}, value: this.state.summary, onChange: this.setStateAsInput('summary'), onDrop: this.dropTextFnc('summary')}), React.createElement("br", null)
                        ), 
                        React.createElement("div", {style: {width: 600, height: 200}}, summaryMarkup), 
                            React.createElement("textarea", {name: "body", style: {width: 800, height: 250}, value: this.state.body, onChange: this.setStateAsInput('body'), onDrop: this.dropTextFnc('body')}), React.createElement("br", null), 
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
    },

    fetchArticle: function(id) {
        this.setState({title: '-', subtitle: '-', image: '-', summary: '-', body: '-'});
        Superagent('get', '/api/article/' + id).end(function(err, response) {
            console.log('response: ', response);
            //TODO: try doing this.setState(response.body); instead. If not, then perhaps a clone method.
            this.setState({
                title: response.body.title,
                subtitle: response.body.subtitle,
                image: response.body.image,
                summary: response.body.summary,
                body: response.body.body,
            });
        }.bind(this));
    },

    handleDrop: function(event) {
        this.uploadFile(event, function(error, response) {
            console.log('successfull uploaded file?', response.body);
            this.setState({image: response.body.url});
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
    
    dropTextFnc: function(stateKey) {
        return function(event) {
            function splice(text, splice, pos) {  return text.slice(0, pos) + splice + text.slice(pos); }

            var carPos = event.target.selectionStart;

            this.uploadFile(event, function(err, response) {
                console.log('err, response: ', err, response);
                var stateObj = {};
                stateObj[stateKey] = splice(this.state[stateKey], response.body.url, carPos);
                this.setState(stateObj);
            }.bind(this));
        }.bind(this);
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
