import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import UserPanel from '../UserPanel.jsx';
import User from '../helpers/user.jsx';

class UserPanelContainer extends React.Component {
    componentWillMount() {
        User.getUser(this.props.params.username).end((err, response) => {
            this.props.dispatch({
                type: 'data_users',
                users: [response.body[0]], //TODO: why [0]... different from grabbing an article
            });
        });
    }

    render({ users }) {
        const index = users.findIndex((user) => user.username === this.props.params.username);

        return <UserPanel user={users[index]} />
    }
}

export default connect(data)(UserPanelContainer);
