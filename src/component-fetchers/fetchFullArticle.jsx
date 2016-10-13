import FullArticleContainer from '../components/fetching-containers/FullArticleContainer.jsx';
import { loadArticleById, loadArticleByTitle } from '../actions/Article.jsx';
import { ARTICLE } from '../constants/api.jsx';

const fetchFullArticle = (dispatch, { _id, title }, loaded) => {
        if(!_id && !title)
           throw 'Neither title nor id were given to Data_FullArtile';

        if(_id) {
            if(!loaded[ARTICLE + '/' + _id])   
                dispatch(loadArticleById(_id));
        } else {
            if(!loaded[encodeURI(ARTICLE + '?title=' + title)])   
                dispatch(loadArticleByTitle(title));
        }

        return FullArticleContainer;
};

export default fetchFullArticle;
