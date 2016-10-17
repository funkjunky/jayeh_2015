import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';
import serializeFormData from '../helpers/serializeFormData.jsx';
import { ARTICLE } from '../constants/api.jsx';

export const loadArticles = () => (dispatch) => {
    return dispatch(dispatchFetch(ARTICLE))
        .then((response) => response.json())
        .then((articles) => {
            dispatch(addArticles(articles));
            dispatch(finishedFetching(ARTICLE));
            return articles;
        });
};

export const loadArticleById = (_id) => (dispatch) => {
    const url = ARTICLE + '/' + _id;
    return dispatch(dispatchFetch(url))
        .then((response) => response.json())
        .then((article) => {
            dispatch(addArticles([article]));
            dispatch(finishedFetching(url));
            return article;
        });
};

export const loadArticleByTitle = (title) => (dispatch) => {
    const url = encodeURI(ARTICLE + '?title=' + title);
    return dispatch(dispatchFetch(url))
        .then((response) => response.json())
        .then((articles) => {
            dispatch(addArticles(articles));
            dispatch(finishedFetching(url));
            return articles[0];
        });
};

export const saveArticle = (formData) => (dispatch) =>
    (!formData.get('_id'))
        ?   postNewArticle(serializeFormData(formData))(dispatch)
        :   putOldArticle(serializeFormData(formData))(dispatch);

export const postNewArticle = (formArticle) => (dispatch) => {
    return dispatch(dispatchFetch(ARTICLE, {
        method: 'post',
        body: JSON.stringify(formArticle),
        headers: {
            'Content-Type': 'application/json',
        },
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]));
            dispatch(finishedFetching(ARTICLE));
            return article;
        });
};

export const putOldArticle = (article) => (dispatch) => {
    const id = article._id;
    delete article._id;
    return dispatch(dispatchFetch(ARTICLE + '/' + id, {
        method: 'put',
        body: JSON.stringify(article),
        headers: {
            'Content-Type': 'application/json',
        },
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]));
            dispatch(finishedFetching(ARTICLE));
            return article;
        });
};


export const addArticles = (articles) => ({
    articles: articles,
    type: 'add_articles',
});
