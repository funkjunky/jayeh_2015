const loading = (state = { loading: [] }, { type, url }) => {
    switch(type) {
        case 'fetching':
            return { ...state, loading: [...loading, url] };
        case 'fetchingComplete':
            return { ...state, loading: loading.splice(loading.indexOf(url), 1) };
        case default:
            return state;
    }
};

export default loading;
