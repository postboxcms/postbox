import jwt from './jwtmanager';
import auth from './authmanager';
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { api } from './vars';

export const isLogin = () => {
    let history = useHistory();
    let browserHistory = createBrowserHistory();
    const loginUrl = api.adminPrefix + api.loginUrl;

    if(jwt.getToken(api.token) !== null) {
        auth.get('/VerifyToken')
            .then((res) => console.log('Login successful'))
            .catch((err) => {
                jwt.removeToken(api.token)
                history.push(api.adminPrefix + api.loginUrl)
            });
        return true;
    }
    if(browserHistory.location.pathname !== loginUrl) {
        history.push(loginUrl);
    }
}
