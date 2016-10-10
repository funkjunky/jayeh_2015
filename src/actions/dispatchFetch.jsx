import fetch from 'isomorphic-fetch';
import { host } from '../constants/server.jsx';

const dispatchFetch = (url, options) => (dispatch) => {
    if(url.substring(0, 4) !== 'http')
        url = host + url;
    dispatch(fetchAction(url));
    return fetch(url, options)
/*
        .then((r) => {
            console.log('r: ', r.status);
            return r;
        });
*/
        //.catch((err) => console.log('dispatchFetch error: ', err) );
};

const fetchAction = (url) => ({
    type: 'fetching',
    url
});

export default dispatchFetch;
