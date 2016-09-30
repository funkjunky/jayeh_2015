import React from 'react';
var Routes = React.createFactory(require('./routes.jsx'));

if(typeof window !== 'undefined') {
    window.onload = function() {
        React.render(Routes(), document);
    }
}
