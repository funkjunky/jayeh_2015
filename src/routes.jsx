import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from './reducers.jsx';

import Header from './components/Header.jsx';
import Blog from './components/fetching-containers/BlogContainer.jsx';
import EditArticle from './components/fetching-containers/EditArticleContainer.jsx';
import NewArticle from './components/full-page/EditArticle.jsx';
import FullArticle from './components/fetching-containers/FullArticleContainer.jsx';
import Login from './routes/Login.jsx';
import UserPanel from './components/fetching-containers/UserPanelContainer.jsx';
import User from './helpers/user.jsx';

//A global function to preventDefault and return false. super convinient for onSubmit for forms.
globals = globals || {};
//usage: onSubmit={ pd((event) => login(event.target)) }
pd = globals.pd = (fnc) => (event) => {
    event.preventDefault();
    fnc(event);
    return false;
};

let store = createStore(combineReducers({
    ...reducers,
    routing: routerReducer,
});

let history = syncHistoryWithStore(browserHistory, store);

//TODO: I don't think provider belongs here...
var Routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Blog}/>

            <Route path="/blog" component={<Blog />} />
            <Route path="/article/create" component={<NewArticle />} />
            <Route path="/article/edit(/:_id)" component={<EditArticle />} />
            <Route path="/article/id/:_id" component={<FullArticle />} />
            <Route path="/article/t/:title" component={<FullArticle />} />
            <Route path="/user/:username" component={<UserPanel />} />

            <Route path="/login" component={<Login />} />
        </Router>
    </Provider>
);

export default Routes;
