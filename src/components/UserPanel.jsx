import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { logout } from '../actions/User.jsx';

//TODO: I may need to wrap logout with a function that calls event.preventDefault... hopefully I won't need to bother... Delete if i dont.
var UserPanel = ({ user, currentUser, logout }) => (
    <div>
        <pre>{JSON.stringify(user)}</pre>
        <br />
        {(user.username == currentUser.username)
        ? <Link to="/api/auth/logout" onClick={logout}>Logout</Link> : ''}
    </div>
);

export default connect(({ app }) => ({ currentUser: app.user }), { logout })(UserPanel);
