var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var Header = require('./components/header');
var Blog = require('./routes/blog');
var EditArticle = require('./routes/article/edit');
var FullArticle = require('./routes/article/full');
var Login = require('./routes/login');
var UserPanel = require('./routes/user-panel');
var User = require('./helpers/user');

//TODO: remove after testing
var ReduxGameHeader = require('./components/one-offs/redux-game-header');

var Routes = React.createClass({
    render: function() {
        if(this.props.path) {
            var parts = this.props.path.split('/');
            var excludeHeader = parts[1] == 'article' && (parts[2] == 't' || parts[2] == 'id');
        }
            
        return (
            <html>
                <head>
                    <title>Jayeh - Jasons tech and opinions</title>
                    <link rel="stylesheet" href="/dist/base.css" />
                    <link rel="stylesheet" href="/dist/default.css" />
                    <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="/dist/styles/codepen-embed.css" />
                    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />

                </head>
                <body>
                    {(excludeHeader) ? '' : <Header />}
                    <div style={{fontFamily: 'tahoma'}}>
                        <Locations path={this.props.path}>
                            <Location path="/" handler={<Blog />} />
                            <Location path="/blog" handler={<Blog />} />
                            <Location path="/article/create" handler={<EditArticle />} />
                            <Location path="/article/edit(/:id)" handler={<EditArticle />} />
                            <Location path="/article/id/:id" handler={<FullArticle />} />
                            <Location path="/article/t/:title" handler={<FullArticle />} />
                            <Location path="/user/:username" handler={<UserPanel />} />

                            <Location path="/reduxgameheader" handler={<ReduxGameHeader />} />

                            <Location path="/login" handler={<Login />} />
                        </Locations>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <p style={{marginTop: 100, textAlign: 'right'}}>
                        jayeh.ca (Jason McCarrell)
                    </p>
                    <script src="/dist/bootstrap.js"></script>
                </body>
            </html>
        )
    },
});

module.exports = Routes;
