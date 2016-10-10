import FullArticleContainer from '../components/fetching-containers/FullArticleContainer.jsx';
import { loadArticleById, loadArticleByTitle } from '../actions/Article.jsx';
import { loadComments } from '../actions/Comments.jsx';

const fetchFullArticle = (dispatch, { _id, title }) => {
        if(!_id && !title)
           throw 'Neither title nor id were given to Data_FullArtile';

        if(_id)
            dispatch(loadArticleById(_id));
        else
            dispatch(loadArticleByTitle(title));

        return FullArticleContainer;
};

export default fetchFullArticle;
