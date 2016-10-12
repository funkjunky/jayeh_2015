import React from 'react';
import { connect } from 'react-redux';

import UserPanel from '../UserPanel.jsx';

const UserPanelContainer = ({ user }) =>    <UserPanel user={user} />

export default connect(({ data }, { params }) => {
    const index = data.users.findIndex((user) => user.username === params.username);
    
    return {
        user: data.users[index],
    };
})(UserPanelContainer);
