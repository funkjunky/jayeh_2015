import React from 'react';
import { connect } from 'react-redux';

import UserPanel from '../UserPanel.jsx';

const UserPanelContainer = ({ user }) =>  {
        if(user)
            return <UserPanel user={user} />
        else
            return <div>Loading...</div>
}

export default connect(({ data }, { params }) => {
    const index = users.findIndex((user) => user.username === this.props.params.username);
    
    return {
        user: data.users[index],
    };
})(UserPanelContainer);
