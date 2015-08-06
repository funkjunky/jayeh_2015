var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var Header = require('./header');
var Blog = require('./blog');
var EditArticle = require('./article/edit');

var Routes = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>Jayeh - Jason's tech and opinions</title>
                    <link rel="stylesheet" href="/dist/reset.css" />
                </head>
                <body>
                    <Header />
                    <Locations path={this.props.path}>
                        <Location path="/" handler={<Blog />} />
                        <Location path="/blog" handler={<Blog />} />
                        <Location path="/article/create" handler={<EditArticle />} />
                        <Location path="/article/edit(/:id)" handler={<EditArticle />} />
                    </Locations>
                    <script src="dist/bootstrap.js"></script>
                </body>
            </html>
        );
    },
});

module.exports = Routes;
