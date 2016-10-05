import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers.jsx';

const getStore = () => createStore(combineReducers({
    ...reducers,
    routing: routerReducer,
}), [
    thunkMiddleware,
]);

export default getStore;
