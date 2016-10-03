import fetch from 'isomorphic-fetch'

export const loadArticles = () => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article')
        .then((response) => response.json)
        .then((articles) =>
            dispatch(addArticles(articles))
        );
};

export const loadArticleById = (_id) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article/' + _id)
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
        );
};

export const loadArticleByTitle = (title) => (dispatch) => {
    //TODO: dispatch that we are fetching...
    return fetch('/api/article?title=' + title)
        .then((response) => response.json)
        .then((article) =>
            dispatch(addArticles([article]))
        );
};


export const addArticles = (articles) => ({
    type: 'add_articles',
    articles: articles,
});
