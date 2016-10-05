import actionFetch from './actionFetch.jsx';
import serializeForm from '../helpers/serializeForm.jsx';

export const loadArticles = () => (dispatch) => {
    return dispatch(actionFetch('/api/article'))
        .then((response) => response.json)
        .then((articles) => {
            dispatch(addArticles(articles))
            return articles;
        });
};

export const loadArticleById = (_id) => (dispatch) => {
    return dispatch(actionFetch('/api/article/' + _id))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]))
            return article;
        });
};

export const loadArticleByTitle = (title) => (dispatch) => {
    return dispatch(actionFetch('/api/article?title=' + title))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]))
            return article;
        });
};

export const saveArticle = (formData) => (dispatch) =>
    (article._id)
        ?   postNewArticle(article)(dispatch)
        :   putOldArticle(serializeForm(article))(dispatch);

export const postNewArticle = (formArticle) => (dispatch) => {
    return dispatch(actionFetch('/api/article/', {
        method: 'post',
        body: formArticle,
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]))
            return article;
        });
};

export const putOldArticle = (article) => (dispatch) => {
    return dispatch(actionFetch('/api/article/', {
        method: 'put',
        body: JSON.stringify(article),
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]))
            return article;
        });
};


export const addArticles = (articles) => ({
    type: 'add_articles',
    articles: articles,
});
