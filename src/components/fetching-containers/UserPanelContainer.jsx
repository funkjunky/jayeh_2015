import React from 'react';
import { connect } from 'react-redux';
import Request from 'superagent';

import UserPanel from '../UserPanel.jsx';
import User from '../helpers/user.jsx';

class UserPanelContainer extends React.Component {
    componentWillMount() {
        User.getUser(this.props.params.username).end((err, response) => {
            this.props.dispatch({
                type: 'data_user',
                user: response.body[0], //TODO: why [0]... different from grabbing an article
            });
        });
    }

    render({ user }) {
        return <UserPanel user={user} />
    }
}

export default connect(data)(UserPanelContainer);
