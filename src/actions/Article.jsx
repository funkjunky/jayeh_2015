import fetch from './dispatchFetch.jsx';
import serializeForm from '../helpers/serializeForm.jsx';
import { loadComments } from './Comments.jsx';

export const loadArticles = () => (dispatch) => {
    const url = '/api/article';
    return dispatch(fetch(url))
        .then((response) => response.json())
        .then((articles) => {
            //console.log('finished fetching articles...', articles.length);
            dispatch({ ...addArticles(articles), finishedFetch: url });
            return articles;
        });
};

export const loadArticleById = (_id) => (dispatch) => {
    const url = '/api/article/' + _id;
    dispatch(loadComments(_id));
    return dispatch(fetch(url))
        .then((response) => response.json())
        .then((article) => {
            dispatch({ ...addArticles([article]), finishedFetch: url });
            return article;
        });
};

//IMPORTANT: This has to handle the comment loading after getting the article.
export const loadArticleByTitle = (title) => (dispatch) => {
    const url = '/api/article?title=' + title;
    return dispatch(fetch(encodeURI(url)))
        .then((response) => response.json())
        .then((articles) => {
            dispatch(loadComments(articles[0]._id));
            dispatch({ ...addArticles(articles), finishedFetch: url })
            return articles[0];
        });
};

export const saveArticle = (formData) => (dispatch) =>
    (article._id)
        ?   postNewArticle(article)(dispatch)
        :   putOldArticle(serializeForm(article))(dispatch);

export const postNewArticle = (formArticle) => (dispatch) => {
    const url = '/api/article/';
    return dispatch(fetch(url, {
        method: 'post',
        body: formArticle,
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch({ ...addArticles([article]), finishedFetch: url })
            return article;
        });
};

export const putOldArticle = (article) => (dispatch) => {
    const url = '/api/article/';
    return dispatch(fetch(url, {
        method: 'put',
        body: JSON.stringify(article),
    }))
        .then((response) => response.json)
        .then((article) => {
            dispatch({ ...addArticles([article]), finishedFetch: url })
            return article;
        });
};


export const addArticles = (articles) => ({
    articles: articles,
    type: 'add_articles',
});
