const articles = (state = [], { type, articles }) => {
    switch(type) {
        case 'add_articles':
            return state.concat(articles);
        default:
            return state;
    }
}

export default articles;
