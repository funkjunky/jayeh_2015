import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers.jsx';

const getStore = (data) => {
    if(typeof window !== 'undefined')
        return createStore(reducers, data, compose(applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory)), window.devToolsExtension && window.devToolsExtension()));
    else
        return createStore(reducers, data, applyMiddleware(thunkMiddleware));
};

export default getStore;
