import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions/User.jsx';

//TODO: I may need to wrap logout with a function that calls event.preventDefault... hopefully I won't need to bother... Delete if i dont.
var UserPanel = ({ user }) => (
    <div>
        <pre>{user}</pre>
        <br />
        {(user.username == currentUser.username)
        ? <a href="/api/auth/logout" onClick={logout}>Logout</a> : ''}
    </div>
);

export default connect(({ app }) => ({ currentUser: app.user }), { logout })(UserPanel);
