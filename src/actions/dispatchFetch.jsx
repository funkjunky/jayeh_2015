import fetch from 'isomorphic-fetch';
import { host } from '../constants/server.jsx';

export const dispatchFetch = (url, options) => (dispatch) => {
    if(url.substring(0, 4) !== 'http')
        url = host + url;
    dispatch(fetchAction(url));
    return fetch(url, options);
        //.catch((err) => console.log('dispatchFetch error: ', err) );
};

export const fetchAction = (url) => ({
    type: 'fetching',
    url
});

export const finishedFetching = (url) => ({
    type: 'finished_fetching',
    url
});
