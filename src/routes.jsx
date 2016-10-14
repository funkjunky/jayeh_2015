import React from 'react';
import { Route, IndexRoute } from 'react-router';

import fetchBlog from './component-fetchers/fetchBlog.jsx';
//import fetchEditArticle from './component-fetchers/fetchEditArticle.jsx';
import NewArticle from './components/full-page/EditArticle.jsx';
import fetchFullArticle from './component-fetchers/fetchFullArticle.jsx';
import Login from './components/Login.jsx';
import fetchUserPanel from './component-fetchers/fetchUserPanel.jsx';
import Layout from './components/Layout.jsx';

import { reconnect } from './actions/User.jsx';

//TODO: dont pass null, pass the nextState, just in case I nest later.
var Routes = (store) => {
    return (
        //Note: this means we won't load server side page until user is loaded... no matter which page we load...
        //TODO: we don't want to wait for user... we need to not do this on the server side. I think...
        <Route path="/" component={ Layout } onEnter={ (nextState, cb) => store.dispatch(reconnect()) }>
            <IndexRoute getComponent={ (nextState, cb) => cb(null, fetchBlog(store.dispatch, store.getState().app.loaded)) } />
            <Route path="/blog" getComponent={ (nextState, cb) => cb(null, fetchBlog(store.dispatch, store.getState().app.loaded)) } />
            <Route path="/article/create" component={ NewArticle } />
            <Route path="/article/edit(/:id)" component={ NewArticle } />
            <Route path="/article/id/:_id" getComponents={ ({ params }, cb) => cb(null, fetchFullArticle(store.dispatch, params, store.getState().app.loaded)) } />
            <Route path="/article/t/:title" getComponent={ ({ params }, cb) => cb(null, fetchFullArticle(store.dispatch, params, store.getState().app.loaded)) } />
            <Route path="/user/:username" getComponents={ ({ params }, cb) => cb(null, fetchUserPanel(store.dispatch, params.username, store.getState().app.loaded)) } />
            <Route path="/user" getComponents={ ({ params }, cb) => cb(null, fetchUserPanel(store.dispatch, null, store.getState().app.loaded)) } />

            <Route path="/login" component={ Login } />
        </Route>
    );
};

export default Routes;
