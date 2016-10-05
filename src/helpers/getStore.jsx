import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk'

import waitForIt from '../middlewares/waitForIt.jsx';
import reducers from '../reducers.jsx';

const getStore = () => createStore(combineReducers({
    ...reducers,
    routing: routerReducer,
}), applyMiddleware(thunkMiddleware, waitForIt));

export default getStore;
