import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './components/Header.jsx';
import Blog from './components/fetching-containers/BlogContainer.jsx';
import EditArticle from './components/fetching-containers/EditArticleContainer.jsx';
import NewArticle from './components/full-page/EditArticle.jsx';
import FullArticle from './components/fetching-containers/FullArticleContainer.jsx';
import Login from './components/Login.jsx';
import UserPanel from './components/fetching-containers/UserPanelContainer.jsx';
import User from './helpers/user.jsx';

//TODO: I'd prefer to remove App and not have the component
var Routes = (
    <Route path="/">
        <IndexRoute component={Blog} />
        <Route path="/blog" component={Blog} />
        <Route path="/article/create" component={NewArticle} />
        <Route path="/article/edit(/:_id)" component={EditArticle} />
        <Route path="/article/id/:_id" component={FullArticle} />
        <Route path="/article/t/:title" component={FullArticle} />
        <Route path="/user/:username" component={UserPanel} />

        <Route path="/login" component={Login} />
    </Route>
);

export default Routes;
