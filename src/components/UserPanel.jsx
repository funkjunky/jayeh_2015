import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import Title from 'react-title-component';

import { logout } from '../actions/User.jsx';

var UserPanel = ({ user, currentUser, logout, push }) => (
    <div>
        <Title render={(prevTitle) => prevTitle + ' - user "' + user.username + '"'} />
        <pre>{JSON.stringify(user)}</pre>
        <br />
        {(user.username == currentUser.username)
        ? <Link to="/login" onClick={(e) => {e.preventDefault(); logout(); push('/login');}}>Logout</Link> : ''}
    </div>
);

export default connect(({ app }) => ({ currentUser: app.user }), { logout, push })(UserPanel);
