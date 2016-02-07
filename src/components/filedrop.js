var React = require('react');
var Superagent = require('superagent');

var globalsAdded = false;
var dragTally = 0;
var Filedrop = function(options) {
    return React.createClass({
        localTally: 0,
        defaultStyles: [],
        componentDidMount: function() {
            this.addEvents();
        },

        render: function() {
            return (
                React.createElement("div", {className: "dropZone", style: {display: 'inline-block'}, onDrop: this.handleDrop, onDragEnter: this.localDragEnter, onDragLeave: this.localDragLeave}, 
                    this.props.children
                )
            );
        },

        handleDrop: function(event) {
            event.preventDefault();
            if(this.props.handleDrop)
                this.props.handleDrop(event);
        },

        addEvents: function() {
            if(!globalsAdded) {
                globalsAdded = true;
                document.addEventListener('dragenter', this.dragEnter);
                document.addEventListener('dragleave', this.dragLeave);
            }
        },

        dragEnter: function(event) {
            var dropZones = document.querySelectorAll('.dropZone');
            if(dragTally++ == 0) //Note: postfix important
                for(var i=0; i!=dropZones.length; ++i) {
                    this.defaultStyles[i] = {};
                    for(var key in options.dragStartStyle) {
                        this.defaultStyles[i][key] = dropZones[i].style[key];
                        dropZones[i].style[key] = options.dragStartStyle[key];
                    }
                }
        },
        dragLeave: function(event) {
            var dropZones = document.querySelectorAll('.dropZone');
            if(--dragTally == 0)
                for(var i=0; i!=dropZones.length; ++i)
                    for(var key in options.dragStartStyle)
                        dropZones[i].style[key] = this.defaultStyles[i][key];
        },

        localDragEnter: function(event) {
            if(this.localTally++ == 0)
                for(var key in options.dragStartStyle)
                    this.getDOMNode().style[key] = options.dragHoverStyle[key];
        },
        localDragLeave: function(event) {
            if(--this.localTally == 0)
                for(var key in options.dragStartStyle)
                    this.getDOMNode().style[key] = options.dragStartStyle[key];
        },
    });
};

module.exports = Filedrop;
