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

var Routes = React.createClass({displayName: "Routes",
    render: function() {
        return (
            React.createElement("html", null, 
                React.createElement("head", null, 
                    React.createElement("title", null, "Jayeh - Jason's tech and opinions"), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/base.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/default.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/node_modules/font-awesome/css/font-awesome.min.css"}), 
                    React.createElement("link", {rel: "stylesheet", href: "/dist/styles/codepen-embed.css"})
                ), 
                React.createElement("body", null, 
                    React.createElement(Header, null), 
                    React.createElement("div", {style: {fontFamily: 'tahoma'}}, 
                        React.createElement(Locations, {path: this.props.path}, 
                            React.createElement(Location, {path: "/", handler: React.createElement(Blog, null)}), 
                            React.createElement(Location, {path: "/blog", handler: React.createElement(Blog, null)}), 
                            React.createElement(Location, {path: "/article/create", handler: React.createElement(EditArticle, null)}), 
                            React.createElement(Location, {path: "/article/edit(/:id)", handler: React.createElement(EditArticle, null)}), 
                            React.createElement(Location, {path: "/article/id/:id", handler: React.createElement(FullArticle, null)}), 
                            React.createElement(Location, {path: "/article/t/:title", handler: React.createElement(FullArticle, null)}), 
                            React.createElement(Location, {path: "/user/:username", handler: React.createElement(UserPanel, null)}), 

                            React.createElement(Location, {path: "/login", handler: React.createElement(Login, null)})
                        )
                    ), 
                    React.createElement("script", {src: "/dist/bootstrap.js"})
                )
            )
        )
    },
});

module.exports = Routes;
