var _ = require('underscore');

var Palette = require('./palette');


var Styles = {};

Styles.with = function(key, additionalStyles) {
    return _.extend(_.clone(Styles[key]), additionalStyles);
};

Styles.fullWidth = {width: '100%', position: 'relative', display: 'block'};
Styles.columnRowTable = Styles.with('fullWidth', {overflow: 'auto', padding: 0, height: 30, marginBottom: 2, marginTop: 2, display: 'table', position: 'relative'});
Styles.columnRowRow = Styles.with('fullWidth', {display: 'table-row'});
Styles.button = {cursor: 'pointer'};
Styles.rowButton = Styles.with('button', {borderRadius: 5, width: 24, border: '2px solid black', fontSize: 21, display: 'table-cell', height: '100%'});
Styles.rowBadge = Styles.with('button', {width: 50, height: 19, padding: 6, fontSize: 20, display: 'table-cell', textAlign: 'center', position: 'absolute', right: 0, top: 0});
Styles.badgeFont = {fontFamily: 'Palatino Linotype', fontSize: 24};
Styles.circleButton = Styles.with('button', {borderRadius: 8, width: 16, height: 16, fontSize: 16, textAlign: 'center', cursor: 'pointer', zIndex: 1});
Styles.basicButton = Styles.with('button', {borderRadius: 2, border: '2px solid black', fontSize: 16, backgroundColor: 'white', color: 'black', boxShadow: '4px 4px 2px rgba(0,0,0,0.75)', marginTop: 5, display: 'inline-block'});
Styles.basicButtonPressed = Styles.with('basicButton', {boxShadow: 'inset 2px 2px 2px rgba(0,0,0,0.75)',});

//perhaps have a maroon overlay colour? it might add a nice flare. Try some different overlay colours that are very dark.
Styles.overlay = {position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.6, zIndex: 2};
Styles.aboveOverlay = {zIndex: 30, backgroundColor: 'white'};


module.exports = Styles;
