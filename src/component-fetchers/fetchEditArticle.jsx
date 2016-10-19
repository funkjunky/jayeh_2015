import EditArticleContainer from '../components/fetching-containers/EditArticleContainer.jsx';
import { loadArticleById } from '../actions/Article.jsx';
import { ARTICLE } from '../constants/api.jsx';

//deprecated: article is now loaded on the container.
const fetchEditArticle = (dispatch, id, loaded) => {
    if(!loaded[ARTICLE + '/' + id])    {
        console.log('fetching article for edit...');
        dispatch(loadArticleById(id));
    }
    return EditArticleContainer;
};

export default fetchEditArticle;
