import React from 'react';
import { connect } from 'react-redux';

import UserPanel from '../UserPanel.jsx';

const UserPanelContainer = ({ user }) =>    <UserPanel user={user} />

export default connect(({ data, app }, { params }) => {
    if(params.username)
        return {    user: data.users[data.users.findIndex((user) => user.username === params.username)]    };
    else
        return {    user: app.user  };
})(UserPanelContainer);
