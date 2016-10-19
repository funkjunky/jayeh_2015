import React from 'react';
import { connect } from 'react-redux';
import Superagent from 'superagent';
import _Filedrop from 'react-filedrop';
let Filedrop = _Filedrop({
    dragStartStyle: {border: 'dashed 1px #00DD00', backgroundColor: '#AAFFAA'},
    dragHoverStyle: {border: 'dashed 2px #0000DD', backgroundColor: '#AAAAFF'},
});
import Title from 'react-title-component';

import Jayehmd from '../../helpers/jayehmd.jsx';

import ArticleSummary from '../ArticleSummary.jsx';
import ArticleHeader from '../ArticleHeader.jsx';

import { saveArticle, loadArticleById } from '../../actions/Article.jsx';
import { uploadFile } from '../../actions/Upload.jsx';

class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        if(props.article)
            this.state = {...props.article};
        else
            this.state = {
                _id: false,
                title: ' ',
                subtitle: ' ',
                header: ' ',
                image: '/dist/header3.jpg',
                video: 'false',
                header: ' ',
                body: ' ',
            };
    }

    componentDidMount() {
        this.props.loadArticleById(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps.article});
    }

    render() {
        var md = Jayehmd(this.state);

        var headerMarkup = md.renderTokens(this.state.header);
        var bodyMarkup = md.renderTokens(this.state.body);

        const setStateAsInput = (key) => ({ target }) => this.setState({ [key]: (target.value === 'false') ? false : target.value });

        //TODO: inputs should use a component that gets rid of hte massive redundency, if possible... i just hate writing subtitle 3 times
        return (
            <div>
                <Title render={(prevTitle) => prevTitle + ' - Editing ' + this.state.title} />
                <h2>Edit Article</h2>
                <div>
                    <form onSubmit={(event) => { event.preventDefault(); this.props.saveArticle(new FormData(event.target)); }} ref="myform">
                        <div>
                            {(this.state.created_at) ? <input type="hidden" name="created_at" value={this.state.created_at} /> : ''}
                            {(this.state._id) ? <input type="hidden" name="_id" value={this.state._id} /> : ''}
                            <input type="text" name="title" value={this.state.title} onChange={setStateAsInput('title')} /><br />
                            <input type="text" name="subtitle" value={this.state.subtitle} onChange={setStateAsInput('subtitle')} /><br />
                            <Filedrop handleDrop={this.handleDrop('image')}>
                                <input type="text" name="image" value={this.state.image} onChange={setStateAsInput('image')} />
                            </Filedrop>
                            <Filedrop handleDrop={this.handleDrop('video')}>
                                <input type="text" name="video" value={this.state.video} onChange={setStateAsInput('video')} />
                            </Filedrop>
                        </div>
                        <Filedrop>
                            <textarea name="header" style={{width: 800, height: 150}} value={this.state.header} onChange={setStateAsInput('header')} onDrop={this.dropTextFnc('header')} /><br />
                        </Filedrop>
                            <textarea name="body" style={{width: 800, height: 250}} value={this.state.body} onChange={setStateAsInput('body')} onDrop={this.dropTextFnc('body')} /><br />
                        <input type="submit" />
                        <div style={{marginLeft: '5%', maxWidth: 800, height: 120}}>
                            <ArticleSummary article={this.state} />
                        </div>
                        <ArticleHeader image={this.state.image} video={this.state.video}>{headerMarkup}</ArticleHeader>
                        <div id="blog-body" style={{fontSize: 14, maxWidth: '50em', margin: 'auto', lineHeight: '200%'}}>
                            {bodyMarkup}
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    handleDrop(key) {
        return (event) => {
            this.props.uploadFile(event.dataTransfer.files[0])
                .then((response) => {
                    console.log('successfull uploaded file?', response);
                    this.setState({[key]: response});
                });
        }
    }
    
    dropTextFnc(stateKey) {
        return (event) => {
            function splice(text, splice, pos) {  return text.slice(0, pos) + splice + text.slice(pos); }

            var carPos = event.target.selectionStart;

            this.props.uploadFile(event.dataTransfer.files[0])
                .then((response) => {
                    console.log('err, response: ', err, response);
                    var stateObj = {};
                    stateObj[stateKey] = splice(this.state[stateKey], response.body.url, carPos);
                    this.setState(stateObj);
                });
        };
    }
};

export default connect(
    ({ data }, { params }) => ({ article: data.articles[data.articles.findIndex((a) => a._id === params.id)] }),
    { saveArticle, uploadFile, loadArticleById }
)(EditArticle);
