var React = require('react');
var Request = require('superagent');

var FullArticle = React.createClass({
    getInitialState: function() {
        return {article: {}};
    },
    componentDidMount: function() {
        console.log('getting: ', this.props);
        var url = '/api/article';
        if(this.props.id)
            url += '/' + this.props.id;
        else if(this.props.title)
            url += '?title=' + this.props.title;

        Request('get', url).end(function(err, response) {
            if(response.body[0])
                response.body = response.body[0];

            console.log('response: ', response);
            this.setState({article: response.body});
        }.bind(this));
    },
    render: function() {
        console.log('rendering full');
        return (
            <div>
                <a href={'/article/t/'+this.state.article.title}><h1>{this.state.article.header}</h1></a>
                <p>{this.state.article.body}</p>
            </div>
        )
    },
});

module.exports = FullArticle;
