var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var Header = require('./header');
var Blog = require('./blog');
var EditArticle = require('./article/edit');
var FullArticle = require('./article/full');
var Login = require('./login');
var UserPanel = require('./user-panel');

var Routes = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>Jayeh - Jason's tech and opinions</title>
                    <link rel="stylesheet" href="/dist/base.css" />
                    <link rel="stylesheet" href="/dist/default.css" />
                    <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="/dist/styles/codepen-embed.css" />
                </head>
                <body>
                    <Header />
                    <div style={{fontFamily: 'tahoma'}}>
                        <Locations path={this.props.path}>
                            <Location path="/" handler={<Blog />} />
                            <Location path="/blog" handler={<Blog />} />
                            <Location path="/article/create" handler={<EditArticle />} />
                            <Location path="/article/edit(/:id)" handler={<EditArticle />} />
                            <Location path="/article/id/:id" handler={<FullArticle />} />
                            <Location path="/article/t/:title" handler={<FullArticle />} />
                            <Location path="/user/:username" handler={<UserPanel />} />

                            <Location path="/login" handler={<Login />} />
                        </Locations>
                    </div>
                    <script src="/dist/bootstrap.js"></script>
                </body>
            </html>
        )
    },
});

module.exports = Routes;
