import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';

import objToFormData from '../helpers/objToFormData.jsx';
import { USER, LOGIN, LOGOUT } from '../constants/api.jsx';

export const reconnect = () => (dispatch) => {
    return dispatch(dispatchFetch(USER))
        .then((response) => response.json())
        .then((users) => {
            const user = users[0] || {};
            dispatch({
                type: 'set_user',
                user,
            });
            dispatch(finishedFetching(USER));
            return user;
        });
};

export const login = ({ username, password }) => (dispatch) => {
    return dispatch(dispatchFetch(LOGIN, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }))
        .then((response) => response.json())
        .then((user) => {
            dispatch({
                type: 'set_user',
                user
            });
            dispatch(finishedFetching(LOGIN));
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
            dispatch(finishedFetching(LOGIN));
        });
};

//This is for data.users, not app.user
export const loadUser = (username) => (dispatch) => {
    return dispatch(dispatchFetch(USER + '?username='+username))
        .then((response) => response.json())
        .then((users) =>  {
            dispatch({
                type: 'set_users',
                users: users
            })
            console.log('done loading user...');
            dispatch(finishedFetching(USER + '?username='+username));
            console.log('done sending finished fetch');
        });
};
