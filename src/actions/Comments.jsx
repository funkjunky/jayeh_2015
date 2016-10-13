import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';
import { COMMENT } from '../constants/api.jsx';
import serializeFormData from '../helpers/serializeFormData.jsx';

export const loadComments = (articleId) => (dispatch) => {
    const url = COMMENT + '?article_id='+articleId;
    return dispatch(dispatchFetch(url))
        .then((response) => response.json())
        .then((comments) => {
            dispatch(addComments(comments, articleId));
            dispatch(finishedFetching(url));
            return comments;
        });
};

export const saveComment = (formData) => (dispatch) => {
    return dispatch(dispatchFetch(COMMENT, {
        method: 'post',
        body: JSON.stringify(serializeFormData(formData)),
        headers: {
            'Content-Type': 'application/json',
        },
    }))
        .then((response) => response.json())
        .then((comment) => {
            dispatch(addComment(comment, formData.get('article_id')));
            dispatch(finishedFetching(COMMENT));
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
