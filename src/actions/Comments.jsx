import fetch from './dispatchFetch.jsx';

export const loadComments = (articleId) => (dispatch) => {
    const url = '/api/comment?article_id='+articleId;
    return dispatch(fetch(url))
        .then((response) => response.json())
        .then((comments) => {
            dispatch({ ...addComments(comments, articleId), finishedFetch: url });
            return comments;
        });
};

export const saveComment = (formData) => (dispatch) => {
    const url = '/api/comment/';
    return dispatch(fetch(url, {
        method: 'post',
        body: formData,
    }))
        .then((response) => response.json())
        .then((comment) => {
            dispatch({ ...addComment(comment, articleId), finishedFetch: url })
            return comment;
        });
};

export const addComments = (comments, articleId) => ({
    type: 'add_comments',
    comments,
    articleId,
});

export const addComment = (comment, articleId) => ({
    type: 'add_comment',
    comment,
    articleId,
});
