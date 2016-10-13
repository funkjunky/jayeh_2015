import Blog from '../components/full-page/Blog.jsx';
import { loadArticles } from '../actions/Article.jsx';
import { ARTICLE } from '../constants/api.jsx';

const fetchBlog = (dispatch, loaded) => {
    if(!loaded[ARTICLE])   
        dispatch(loadArticles());
    return Blog;
};

export default fetchBlog;
