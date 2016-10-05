import fetch from 'isomorphic-fetch'

import objToFormData from '../helpers/objToFormData.jsx';

export const reconnect = () => (dispatch) => {
    return fetch('/api/user')
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
    return fetch('/api/auth/login', {
        method: 'post',
        body: formData,
    })
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
    return fetch('/api/auth/logout')
        .then(() => dispatch({
            type: 'set_user',
            user: {},
        }));
};

//This is for data.users, not app.user
export const loadUser = (username) => (dispatch) => {
    return fetch('/api/users?username='+username)
        .then((response) => response.json)
        .then((user) =>  dispatch({
            type: 'set_users',
            users: [user]
        }));
};
