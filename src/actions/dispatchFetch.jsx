import fetch from 'isomorphic-fetch';
import { host } from '../constants/server.jsx';

export const dispatchFetch = (url, options) => (dispatch) => {
    let host = (__host) ? __host : global.__host;  
    url = host + url;
    console.log('host: ', host, url);
    dispatch(fetchAction(url));
    return fetch(url, {
        credentials: 'same-origin', //gotchya: fetch doesn't send cookies by default
        ...options
    })
        .catch((err) => console.log('dispatchFetch error: ', err) );
};

export const fetchAction = (url) => ({
    type: 'fetching',
    url
});

export const finishedFetching = (url) => ({
    type: 'finished_fetching',
    url
});
