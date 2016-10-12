import EditArticleContainer from '../components/fetching-containers/EditArticleContainer.jsx';
import { loadArticleById } from '../actions/Article.jsx';
import { ARTICLE } from '../constants/api.jsx';

const fetchEditArticle = (dispatch, id, loaded) => {
    if(!loaded[ARTICLE + '/' + id])   
        dispatch(loadArticleById(id));
    return EditArticleContainer;
};

export default fetchEditArticle;
