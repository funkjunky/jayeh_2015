import { combineReducers } from 'redux';

import loading from './app/loading.jsx';
import loaded from './app/loaded.jsx';
import user from './app/user.jsx';

const app = combineReducers({
    loading,
    loaded,
    user,
});

export default app;
