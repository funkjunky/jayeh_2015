import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import UserPanel from '../UserPanel.jsx';
import { loadUser } from '../../actions/User.jsx';

class UserPanelContainer extends React.component {
    componentWillMount() {
        this.props.loadUser(this.props.params.username);
    }
    
    render() {
        if(user)
            return <UserPanel user={user} />
        else
            return <div>Loading...</div>
    }
}

export default connect(({ data }, { params }) => {
    const index = users.findIndex((user) => user.username === this.props.params.username);
    
    return {
        user: data.users[index],
    };
}, { loadUser })(UserPanelContainer);
