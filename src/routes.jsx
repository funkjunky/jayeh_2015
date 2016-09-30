import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Header from './components/header.jsx';
import Blog from './components/data-wrappers/blog.jsx';
import EditArticle from './components/data-wrappers/edit-article.jsx';
import NewArticle from './routes/article/edit.jsx';
import FullArticle from './components/data-wrappers/full-article.jsx';
import Login from './routes/login.jsx';
import UserPanel from './components/data-wrappers/user-panel.jsx';
import User from './helpers/user.jsx';

var Routes = (
            <Router history={hashHistory}>
                <Route path="/" component={Blog}/>

                <Route path="/blog" component={<Blog />} />
                <Route path="/article/create" component={<NewArticle />} />
                <Route path="/article/edit(/:id)" component={<EditArticle />} />
                <Route path="/article/id/:id" component={<FullArticle />} />
                <Route path="/article/t/:title" component={<FullArticle />} />
                <Route path="/user/:username" component={<UserPanel />} />

                <Route path="/login" component={<Login />} />
            </Router>
        );

export default Routes;
