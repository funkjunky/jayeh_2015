import React from 'react';
import { Route, IndexRoute } from 'react-router';

import fetchBlog from './component-fetchers/fetchBlog.jsx';
//import fetchEditArticle from './component-fetchers/fetchEditArticle.jsx';
import NewArticle from './components/full-page/EditArticle.jsx';
import fetchFullArticle from './component-fetchers/fetchFullArticle.jsx';
import Login from './components/Login.jsx';
import fetchUserPanel from './component-fetchers/fetchUserPanel.jsx';
import User from './helpers/user.jsx';

//<Route path="/article/edit(/:_id)" getComponent={ ({ params }, cb) => cb(null, fetchEditArticle(store.dispatch, params._id, store.getState().app.loaded)) } />
//TODO: it'd be nice to dispatch to get the user info on the root route, but then id need to return a component.
//TODO: dont pass null, pass the nextState, just in case I nest later.
var Routes = (store) => {
    //const history = syncHistoryWithStore(browserHistory, store);
    return (
        <Route path="/">
            <IndexRoute getComponent={ (nextState, cb) => cb(null, fetchBlog(store.dispatch, store.getState().app.loaded)) } />
            <Route path="/blog" getComponent={ (nextState, cb) => cb(null, fetchBlog(store.dispatch, store.getState().app.loaded)) } />
            <Route path="/article/create" component={ NewArticle } />
            <Route path="/article/edit(/:id)" component={ NewArticle } />
            <Route path="/article/id/:_id" getComponents={ ({ params }, cb) => cb(null, fetchFullArticle(store.dispatch, params, store.getState().app.loaded)) } />
            <Route path="/article/t/:title" getComponent={ ({ params }, cb) => cb(null, fetchFullArticle(store.dispatch, params, store.getState().app.loaded)) } />
            <Route path="/user/:username" getComponents={ ({ params }, cb) => cb(null, fetchUserPanel(store.dispatch, params.username, store.getState().app.loaded)) } />

            <Route path="/login" component={ Login } />
        </Route>
    );
};

export default Routes;
