import actionFetch from './actionFetch.jsx';

export const loadComments = (articleId) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return dispatch(actionFetch('/api/comment?article_id=' + articleId))
        .then((response) => response.json)
        .then((comments) => {
            dispatch(addComments(comments, articleId))
            return comments;
        });
};

export const saveComment = (formData) => (dispatch) => {
    return dispatch(actionFetch('/api/comment/', {
        method: 'post',
        body: formData,
    }))
        .then((response) => response.json)
        .then((comment) => {
            dispatch(addComment(comment, articleId))
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
