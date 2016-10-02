import React from 'react';

import User from '../helpers/user.jsx';

var UserPanel = ({ user }) => (
    <div>
        <pre>{user}</pre>
        <br />
        {(user.username == User.currentUser().username)
        ? <a href="/api/auth/logout" onClick={User.logout}>Logout</a> : ''}
    </div>
);

export default UserPanel;
