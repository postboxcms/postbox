import jwt from './jwtmanager';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

export const isLogin = () => {
    let history = useHistory();
    let browserHistory = createBrowserHistory();
    
    if(jwt.getToken('postbox_token') !== null) {
        return true;
    }
    if(browserHistory.location.pathname !== '/login') {
        history.push('/login');
    }
}
