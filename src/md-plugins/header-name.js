var React = require('react');

var HeaderName = function(md, options) {
    var defaultRender = md.renderer.rules.heading_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
        var aIndex = tokens[idx].attrIndex('name');

        var name = tokens[idx + 1].content.replace(/[^a-zA-Z0-9]*/, '');

        if(aIndex < 0)
            tokens[idx].attrPush(['name', name]); // add new attribute
        else
            tokens[idx].attrs[aIndex][0] = name; // replace old name

        return defaultRender(tokens, idx, options, env, self);
    };
};

module.exports = HeaderName;