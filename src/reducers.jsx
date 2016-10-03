import { combineReducers } from 'redux';

import data from './reducers/data.jsx';
import app from './reducers/app.jsx';

const reducers = combineReducers({
    data: data,
    app: app,
});

export default reducers;
