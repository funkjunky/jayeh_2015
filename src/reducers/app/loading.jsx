const loading = (state = [], { type, url, finishedFetch }) => {
    if(type === 'fetching')
        return [...state, url];
    else if(finishedFetch) {
        state.splice(state.indexOf(finishedFetch), 1); //url is stored in finishedFetch
        return [...state];
    } else
        return state;
};

export default loading;
