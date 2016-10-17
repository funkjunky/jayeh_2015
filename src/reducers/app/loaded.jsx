const loaded = (state = {}, { type, url }) => {
    switch(type) {
        case 'finished_fetching':
            return { ...state, [url]: Date.now() / 1000 };
        default:
            return state;
    }
};

export default loaded;
