import UserPanelContainer from '../components/fetching-containers/UserPanelContainer.jsx';
import { loadUser } from '../actions/User.jsx';
import { USER } from '../constants/api.jsx';

const fetchUserPanel = (dispatch, username, loaded) => {
    if(!loaded[USER + '?username=' + username])   
        dispatch(loadUser(username));
    return UserPanelContainer;
};

export default fetchUserPanel;
