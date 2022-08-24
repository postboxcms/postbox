import axios from 'axios';
import jwt from './jwtmanager';
import { api } from './vars';

const authManager = () => {
    const get = (url) => {
        return axios.get(api.url + url,{
            headers:{
                Authorization: 'Bearer ' + jwt.getToken('postbox_token')
            }
        });
    }
    const post = (url, data) => {
        return axios.post(api.url + url, data, {
            headers:{
                Authorization: 'Bearer ' + jwt.getToken('postbox_token')
            }
        });
    }
    return {
        get,
        post
    }
}
export default authManager();
