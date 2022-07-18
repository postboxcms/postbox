import axios from 'axios';
import jwt from './jwtmanager';

const authManager = () => {
    const get = (url) => {
        return axios.get(url,{headers:{Authorization: 'Bearer ' + jwt.getToken('postbox_token')}})
    }
    return {
        get
    }
}
export default authManager();
