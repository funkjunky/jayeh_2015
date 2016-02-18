var React = require('react');
var Superagent = require('superagent');
var Filedrop = require('react-filedrop')({
    dragStartStyle: {border: 'dashed 1px #00DD00', backgroundColor: '#AAFFAA'},
    dragHoverStyle: {border: 'dashed 2px #0000DD', backgroundColor: '#AAAAFF'},
});

var Jayehmd = require('../../helpers/jayehmd');
var SerializeForm = require('../../helpers/serializeform');
var StateShortcuts = require('../../mixins/stateshortcuts');

var ArticleSummary = require('../../components/article-summary');
var ArticleHeader = require('../../components/article-header');

var EditArticle = React.createClass({
    mixins: [StateShortcuts],
    getInitialState: function() {
        return {
            _id: false,
            title: ' ',
            subtitle: ' ',
            header: ' ',
            image: '/dist/header3.jpg',
            header: ' ',
            body: ' ',
        };
    },
    render: function() {
        var md = Jayehmd(this.state);

        console.log('header: ', this.state.header);
        var headerMarkup = md.renderTokens(this.state.header);
        var bodyMarkup = md.renderTokens(this.state.body);

        //TODO: inputs should use a component that gets rid of hte massive redundency, if possible... i just hate writing subtitle 3 times
        return (
            <div>
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={this.saveArticle} ref="myform">
                        <div>
                            {(this.state.created_at) ? <input type="hidden" name="created_at" value={this.state.created_at} /> : ''}
                            <input type="text" name="title" value={this.state.title} onChange={this.setStateAsInput('title')} /><br />
                            <input type="text" name="subtitle" value={this.state.subtitle} onChange={this.setStateAsInput('subtitle')} /><br />
                            <Filedrop handleDrop={this.handleDrop}>
                                <input type="text" name="image" value={this.state.image} onChange={this.setStateAsInput('image')} />
                            </Filedrop>
                        </div>
                        <Filedrop>
                            <textarea name="header" style={{width: 800, height: 150}} value={this.state.header} onChange={this.setStateAsInput('header')} onDrop={this.dropTextFnc('header')} /><br />
                        </Filedrop>
                            <textarea name="body" style={{width: 800, height: 250}} value={this.state.body} onChange={this.setStateAsInput('body')} onDrop={this.dropTextFnc('body')} /><br />
                        <input type="submit" />
                        <div style={{marginLeft: '5%', maxWidth: 800, height: 120}}>
                            <ArticleSummary article={this.state} />
                        </div>
                        <ArticleHeader image={this.state.image}>{headerMarkup}</ArticleHeader>
                        {bodyMarkup}
                    </form>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        if(this.props.id)
            this.fetchArticle(this.props.id);
    },

    fetchArticle: function(id) {
        this.setState({title: '-', subtitle: '-', image: '-', header: '-', body: '-'});
        Superagent('get', '/api/article/' + id).end(function(err, response) {
            console.log('response: ', response);
            //TODO: try doing this.setState(response.body); instead. If not, then perhaps a clone method.
            var state = {
                _id: response.body._id,
                title: response.body.title,
                subtitle: response.body.subtitle,
                image: response.body.image,
                header: response.body.header,
                body: response.body.body,
            };
            if(response.body.created_at)
                state.created_at = response.body.created_at;
            this.setState(state);
        }.bind(this));
    },

    handleDrop: function(event) {
        this.uploadFile(event, function(url) {
            console.log('successfull uploaded file?', url);
            this.setState({image: url});
        }.bind(this));
    },

    uploadFile: function(event, cb) {
        var dt = event.dataTransfer;
        var files = dt.files;

        var type = files[0].type;

        var getUrl = '/api/sign_s3?file_name='+encodeURIComponent(files[0].name)+'&file_type='+encodeURIComponent(type);
        console.log('signs3 url: ', getUrl);
        console.log('file: ', files[0]);
        Superagent('get', getUrl).end(function(err, response) {
                console.log('signs3 response: ', response);

                Superagent('put', response.body.signed_request)
                .set('x-amz-acl', 'public-read')
                .set('Content-Type', type)
                .send(files[0])
                .end(cb.bind(this, response.body.url));
            });
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
        if(this.state._id)
            Superagent.put('/api/article/' + this.state._id).send(formJson).end(function(err, response) {
                console.log('PUT /api/article, response: ', response.body);
            });
        else
            Superagent.post('/api/article').send(formJson).end(function(err, response) {
                console.log('POST /api/article, response: ', response.body);
            });
    },
});

module.exports = EditArticle;
