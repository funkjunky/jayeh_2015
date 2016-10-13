import React from 'react';
import Superagent from 'superagent';
import { connect } from 'react-redux';

import serializeFormData from '../helpers/serializeFormData.jsx';
import Login from './Login.jsx';
import { saveComment, addComment } from '../actions/Comments.jsx';

var AddComment = ({ article_id, user, saveComment, addComment }) => {
    var placeholders = [
        'I promise I\'ll read this comment... eventually. ...maybe.',
        'Please voice your incorrect opinion.',
        'You want to comment what? How rude.',
        'Please post all your ideas here and I well make millions of them, then send you bran muffins in appreciation.',
    ];
    var placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

    if(!user.username)
        return <Login />

    return (
        <div style={{margin: 20}}>
            <form method="post" action="/api/comment" onSubmit={onSubmit(saveComment, addComment, article_id)}>
                <textarea name="body" placeholder={placeholder} style={{width: 800, height: 150}} />
                <input type="hidden" name="user_id" value={user._id} />
                <input type="hidden" name="article_id" value={article_id} /><br />
                <input type="submit" value="Post Comment" />
            </form>
        </div>
    );
};

const onSubmit = (saveComment, addComment, article_id) => (event) => {
    event.preventDefault();
    var form = event.target;

    var preComment = SerializeFormData(new FormData(form));
    preComment.onlyLocal = true;
    addComment(preComment, article_id);

    //TODO: add UI for when errors occur
    saveComment(new FormData(form))
        .then(() => form.reset())
};

export default connect(({ app }) => ({ user: app.user }), { saveComment, addComment })(AddComment);
