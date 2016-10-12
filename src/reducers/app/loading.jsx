const loading = (state = [], { type, url }) => {
    switch(type) {
        case 'fetching':
            return [...state, url];
        case 'finished_fetching':
            state.splice(state.indexOf(url), 1);
            return [...state];
        default:
            return state;
    }
};

export default loading;
