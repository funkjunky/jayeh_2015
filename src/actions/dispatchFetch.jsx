import fetch from 'isomorphic-fetch';

const actionFetch = (url, options) => (dispatch) => {
    dispatch(fetchingAction(url));
    return fetch(url, options)
        .then((r) => {
            dispatch(fetchCompleteAction(url));
            return r;
        });
};

const fetchAction = (url) => ({
    type: 'fetching',
    url
});

const fetchCompleteAction = (url) => ({
    type: 'fetchingComplete',
    url
});

export default dispatchFetch;
