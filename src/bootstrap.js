var React = require('react');
var Routes = React.createFactory(require('./routes'));

if(typeof window !== 'undefined') {
    window.onload = function() {
        React.render(Routes(), document);
    }
}
