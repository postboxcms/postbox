import jwt from './jwtmanager';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { api } from './vars';

export const isLogin = () => {
    let history = useHistory();
    let browserHistory = createBrowserHistory();
    const loginUrl = api.adminPrefix + api.loginUrl;

    if(jwt.getToken('postbox_token') !== null) {
        return true;
    }
    if(browserHistory.location.pathname !== loginUrl) {
        history.push(loginUrl);
    }
}
