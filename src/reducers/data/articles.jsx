import mergeArrays from '../../helpers/mergeArrays.jsx';

const articles = (state = [], { type, articles }) => {
    switch(type) {
        case 'add_articles':
            return mergeArrays(state, articles);
        default:
            return state;
    }
}

export default articles;
