import actionFetch from './actionFetch.jsx';

import objToFormData from '../helpers/objToFormData.jsx';

export const reconnect = () => (dispatch) => {
    return dispatch(actionFetch('/api/user'))
        .then((response) => response.json)
        .then((user = {}) => {
            dispatch({
                type: 'set_user',
                user,
            });
            return user;
        });
};

export const login = (formData) => (dispatch) => {
    return dispatch(actionFetch('/api/auth/login', {
        method: 'post',
        body: formData,
    }))
        .then((response) => response.json)
        .then((user) => {
            dispatch({
                type: 'set_user',
                user
            });
            return user;
        });
};

export const logout = () => (dispatch) => {
    return dispatch(actionFetch('/api/auth/logout'))
        .then(() => dispatch({
            type: 'set_user',
            user: {},
        }));
};

//This is for data.users, not app.user
export const loadUser = (username) => (dispatch) => {
    return dispatch(actionFetch('/api/users?username='+username))
        .then((response) => response.json)
        .then((user) =>  dispatch({
            type: 'set_users',
            users: [user]
        }));
};
