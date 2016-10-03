const comments = (state = {}, { type, comments, comment, article_id }) => {
    switch(type) {
        case 'add_comments':
            return { ...state, [article_id]: comments };
        case 'add_comment':
            //find the comment and replace it, or create a new one if it doesn't yet exist.
            let newComments = [ ...state[article_id] ];
            const index = newState[article_id].findIndex((_comment) => _comment.body == comment.body);
            if(index !== -1)
                newComments[index] = comment;
            else
                newComments.push(comment);

            return { ...state, [article_id]: newComments };
        default:
            return state;
    }
}

export default comments;
