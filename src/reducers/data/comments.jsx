const comments = (state = {}, { type, comments, comment, articleId }) => {
    switch(type) {
        case 'add_comments':
            console.log('adding the comment and building anew object...', state);
            return { ...state, [articleId]: comments };
        case 'add_comment':
            //find the comment and replace it, or create a new one if it doesn't yet exist.
            let newComments = [ ...state[articleId] ];
            const index = newState[articleId].findIndex((_comment) => _comment.body == comment.body);
            if(index !== -1)
                newComments[index] = comment;
            else
                newComments.push(comment);

            return { ...state, [articleId]: newComments };
        default:
            return state;
    }
}

export default comments;
