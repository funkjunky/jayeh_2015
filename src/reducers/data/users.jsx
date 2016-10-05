const users = (state = [], { type, users }) => {
    switch(type) {
        case 'set_users':
            return state.concat(users);
        default:
            return state;
    }
}

export default users;
