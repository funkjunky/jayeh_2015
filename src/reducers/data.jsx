import { combineReducers } from 'redux';

import articles from './data/articles.jsx';
import users from './data/users.jsx';
import comments from './data/comments.jsx';

const data = combineReducers({
    articles,
    users,
    comments,
});

export default data;
