import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers.jsx';

const getStore = (data) => {
    if(typeof window !== 'undefined') {
        const args = [applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))];
        if(window.devToolsExtension)
            args.push(window.devToolsExtension());
        return createStore(reducers, data, compose(...args));
    } else
        return createStore(reducers, data, applyMiddleware(thunkMiddleware));
};

export default getStore;
