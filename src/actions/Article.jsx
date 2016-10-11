import { dispatchFetch, finishedFetching } from './dispatchFetch.jsx';
import serializeForm from '../helpers/serializeForm.jsx';
import { loadComments } from './Comments.jsx';
import { ARTICLE } from '../constants/api.jsx';

export const loadArticles = () => (dispatch) => {
    return dispatch(dispatchFetch(ARTICLE))
        .then((response) => response.json())
        .then((articles) => {
            //console.log('finished fetching articles...', articles.length);
            dispatch(addArticles(articles));
            dispatch(finishedFetching(ARTICLE));
            return articles;
        });
};

export const loadArticleById = (_id) => (dispatch) => {
    const url = ARTICLE + '/' + _id;
    dispatch(loadComments(_id));
    return dispatch(dispatchFetch(url))
        .then((response) => response.json())
        .then((article) => {
            dispatch(addArticles([article]));
            dispatch(finishedFetching(url));
            return article;
        });
};

//IMPORTANT: This has to handle the comment loading after getting the article.
export const loadArticleByTitle = (title) => (dispatch) => {
    const url = encodeURI(ARTICLE + '?title=' + title);
    return dispatch(dispatchFetch(url))
        .then((response) => response.json())
        .then((articles) => {
            dispatch(loadComments(articles[0]._id));
            dispatch(addArticles(articles));
            dispatch(finishedFetching(url));
            return articles[0];
        });
};

export const saveArticle = (formData) => (dispatch) =>
    (article._id)
        ?   postNewArticle(article)(dispatch)
        :   putOldArticle(serializeForm(article))(dispatch);

export const postNewArticle = (formArticle) => (dispatch) => {
    return dispatch(dispatchFetch(ARTICLE, {
        method: 'post',
        body: formArticle,
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch(addArticles([article]));
            dispatch(finishedFetching(ARTICLE));
            return article;
        });
};

export const putOldArticle = (article) => (dispatch) => {
    return dispatch(dispatchFetch(ARTICLE, {
        method: 'put',
        body: JSON.stringify(article),
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
