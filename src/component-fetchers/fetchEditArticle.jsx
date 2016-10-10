import EditArticleContainer from '../components/fetching-containers/EditArticleContainer.jsx';
import { loadArticleById } from '../actions/Article.jsx';

const fetchEditArticle = (dispatch, id) => {
    dispatch(loadArticleById(id));
    return EditArticleContainer;
};

export default fetchEditArticle;
