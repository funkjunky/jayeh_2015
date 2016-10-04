import fetch from 'isomorphic-fetch'

import serializeForm from '../../helpers/serializeform.jsx';

export const loadArticles = () => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article')
        .then((response) => response.json)
        .then((articles) =>
            dispatch(addArticles(articles))
            return articles;
        );
};

export const loadArticleById = (_id) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article/' + _id)
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
            return article;
        );
};

export const loadArticleByTitle = (title) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article?title=' + title)
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
            return article;
        );
};

export const saveArticle = (formData) => (dispatch) =>
    (article._id)
        ?   postNewArticle(article)(dispatch)
        :   putOldArticle(serializeForm(article))(dispatch);

export const postNewArticle = (formArticle) => (dispatch) => {
    return fetch('/api/article/', {
        method: 'post',
        body: formArticle,
    })
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
            return article;
        );
};

export const putOldArticle = (article) => (dispatch) => {
    return fetch('/api/article/', {
        method: 'put',
        body: JSON.stringify(article),
    })
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
            return article;
        );
};


export const addArticles = (articles) => ({
    type: 'add_articles',
    articles: articles,
});
