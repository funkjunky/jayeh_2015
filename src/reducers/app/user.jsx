const user = (state = {}, { type, user }) {
    switch(type) {
        case 'set_user':
            return user;
        default:
            return state;
    }
};

export default user;
