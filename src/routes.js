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

var Routes = React.createClass({displayName: "Routes",
    render: function() {
        if(this.props.path) {
            var parts = this.props.path.split('/');
            var excludeHeader = parts[1] == 'article' && (parts[2] == 't' || parts[2] == 'id');
        }
            
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Jayeh - Jasons tech and opinions"), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/base.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/default.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/node_modules/font-awesome/css/font-awesome.min.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/styles/codepen-embed.css"}), 
                    React.createElement("link", {rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Open+Sans"})

                ), 
                React.createElement("body", null, 
                    (excludeHeader) ? '' : React.createElement(Header, null), 
                    React.createElement("div", {style: {fontFamily: 'tahoma'}}, 
                        React.createElement(Locations, {path: this.props.path}, 
                            React.createElement(Location, {path: "/", handler: React.createElement(Blog, null)}), 
                            React.createElement(Location, {path: "/blog", handler: React.createElement(Blog, null)}), 
                            React.createElement(Location, {path: "/article/create", handler: React.createElement(EditArticle, null)}), 
                            React.createElement(Location, {path: "/article/edit(/:id)", handler: React.createElement(EditArticle, null)}), 
                            React.createElement(Location, {path: "/article/id/:id", handler: React.createElement(FullArticle, null)}), 
                            React.createElement(Location, {path: "/article/t/:title", handler: React.createElement(FullArticle, null)}), 
                            React.createElement(Location, {path: "/user/:username", handler: React.createElement(UserPanel, null)}), 

                            React.createElement(Location, {path: "/reduxgameheader", handler: React.createElement(ReduxGameHeader, null)}), 

                            React.createElement(Location, {path: "/login", handler: React.createElement(Login, null)})
                        )
                    ), 
                    React.createElement("p", {style: {marginTop: 100, textAlign: 'right'}}, 
                        "jayeh.ca © 2016 (Jason McCarrell)"
                    ), 
                    React.createElement("script", {src: "/dist/bootstrap.js"})
                )
            )
        )
    },
});

module.exports = Routes;
