import _ from 'underscore';

import Palette from './palette.jsx';


var Styles = {};

Styles.with = function(key, additionalStyles) {
    return _.extend(_.clone(Styles[key]), additionalStyles);
};

Styles.fullWidth = {width: '100%', position: 'relative', display: 'block'};
Styles.columnRowTable = Styles.with('fullWidth', {overflow: 'auto', padding: 0, height: 30, marginBottom: 2, marginTop: 2, display: 'table', position: 'relative'});

export default Styles;
