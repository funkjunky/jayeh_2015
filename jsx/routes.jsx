var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;

var Header = require('./header');
var Blog = require('./blog');

var Routes = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <title>Jayeh - Jason's tech and opinions</title>
                    <link rel="stylesheet" href="/dist/all.css" />
                    <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" />
                </head>
                <body>
                    <Header />
                    <Locations path={this.props.path}>
                        <Location path="/" handler={<Blog />} />
                        <Location path="/blog" handler={<Blog />} />
                    </Locations>
                    <script src="dist/bootstrap.js"></script>
                </body>
            </html>
        );
    },
});

module.exports = Routes;
