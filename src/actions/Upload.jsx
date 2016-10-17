import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';

import { SIGN_S3 } from '../constants/api.jsx';

export const uploadFile = (file) => (dispatch) => {
    return dispatch(dispatchFetch(SIGN_S3 + '?file_name='+encodeURIComponent(file.name)+'&file_type='+encodeURIComponent(file.type)))
        .then((response) => response.json())
        .then((uploadInstance) => {
            let formData = new FormData();
            formData.append('file', file);
            dispatch(finishedFetching(SIGN_S3));
            return dispatch(dispatchFetch(uploadInstance.signed_request, {
                method: 'put',
                body: file,
                headers: {
                    'x-amz-acl': 'public-read',
                    'Content-Type': file.type,
                },
            }))
                .then((response) => response.json)
                .then((response) => {
                    dispatch(finishedFetching(uploadInstance.signed_request));
                    //TODO: GRS should return the url it uploaded.
                    return 'https://jayehtest.s3.amazonaws.com/'+encodeURIComponent(file.name);
                });
        });
};
