import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers.jsx';

const getStore = () => createStore(reducers, applyMiddleware(thunkMiddleware));

export default getStore;
