import UserPanelContainer from '../components/fetching-containers/UserPanelContainer.jsx';
import { loadUser } from '../actions/User.jsx';

const fetchUserPanel = (dispatch, username) => {
    dispatch(loadUser(username));
    return UserPanelContainer;
};

export default fetchUserPanel;
