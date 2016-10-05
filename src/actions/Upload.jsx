import actionFetch from './actionFetch.jsx';

export const uploadFile = (file) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return dispatch(actionFetch('/api/sign_s3?file_name='+encodeURIComponent(file.name)+'&file_type='+encodeURIComponent(file.type)))
        .then((response) => response.json)
        .then((uploadInstance) => {
            let formData = new FormData();
            formData.append('file', file);
            return dispatch(actionFetch(uploadInstance.signed_request, {
                method: 'put',
                body: formData,
                headers: {
                    'x-amz-acl': 'public-read',
                    'Content-Type': file.type,
                },
            }))
                .then((response) => response.json);
        });
};
