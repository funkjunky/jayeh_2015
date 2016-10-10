import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import data from './reducers/data.jsx';
import app from './reducers/app.jsx';

const reducers = combineReducers({
    data,
    app,
    routing: routerReducer,
});

export default reducers;
