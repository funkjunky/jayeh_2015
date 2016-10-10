import { combineReducers } from 'redux';

import articles from './data/articles.jsx';
import users from './data/users.jsx';
import comments from './data/comments.jsx';

/*
const data = (state = {}, action) => {
    let a = articles(state.articles, action);
console.log('past articles...');
    let u = users(state.users, action);
    let c = comments(state.comments, action);

    return {
        articles: a,
        users: u,
        comments: c,
    };
};
*/
const data = combineReducers({
    articles,
    users,
    comments,
});

export default data;
