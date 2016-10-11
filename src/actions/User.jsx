import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';

import objToFormData from '../helpers/objToFormData.jsx';
import { USER, LOGIN, LOGOUT } from '../constants/api.jsx';

export const reconnect = () => (dispatch) => {
    return dispatch(dispatchFetch(USER))
        .then((response) => response.json())
        .then((user = {}) => {
            dispatch({
                type: 'set_user',
                user,
            });
            finishedFetching(USER);
            return user;
        });
};

export const login = (formData) => (dispatch) => {
    return dispatch(dispatchFetch(LOGIN, {
        method: 'post',
        body: formData,
    }))
        .then((response) => response.json())
        .then((user) => {
            dispatch({
                type: 'set_user',
                user
            });
            finishedFetching(LOGIN);
            return user;
        });
};

export const logout = () => (dispatch) => {
    return dispatch(dispatchFetch(LOGOUT))
        .then(() => {
            dispatch({
                type: 'set_user',
                user: {},
            });
            finishedFetching(LOGIN);
        });
};

//This is for data.users, not app.user
export const loadUser = (username) => (dispatch) => {
    return dispatch(dispatchFetch(USER + '?username='+username))
        .then((response) => response.json())
        .then((user) =>  {
            dispatch({
                type: 'set_users',
                users: [user]
            })
            finishedFetching(LOGIN);
        });
};
