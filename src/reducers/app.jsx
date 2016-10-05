import { combineReducers } from 'redux';

import loading from './app/loading.jsx';
import user from './app/user.jsx';

const app = combineReducers({
    loading,
    user,
});

export default app;
