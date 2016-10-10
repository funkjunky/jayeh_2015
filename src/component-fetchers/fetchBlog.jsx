import Blog from '../components/full-page/Blog.jsx';
import { loadArticles } from '../actions/Article.jsx';

const fetchBlog = (dispatch) => {
    dispatch(loadArticles());
    return Blog;
};

export default fetchBlog;
