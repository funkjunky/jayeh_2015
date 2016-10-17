const users = (state = [], { type, users, user }) => {
    switch(type) {
        case 'set_users':
            return state.concat(users);
        case 'set_user':
            if(state.indexOf((user) => user._id === user._id) === -1)
                return [...state, user];
            else
                return state;
        default:
            return state;
    }
}

export default users;
