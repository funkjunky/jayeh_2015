const users = (state = [], { type, users }) => {
    switch(type) {
        case 'data_users':
            return state.concat(users);
        default:
            return state;
    }
}

export default articles;
