import axios from 'axios';
import { useSelector } from 'react-redux';
import { api } from '../utils/constants';
import { getToken } from '../store/jwt';

export const useAuthentication = () => {
    const token = useSelector(getToken);
    const get = (url) => {
        return axios.get(api.url + url,{
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
    }
    const post = (url, data) => {
        return axios.post(api.url + url, data, {
            headers:{
                Authorization: 'Bearer ' + token
            }
        });
    }
    return {
        get,
        post
    }
}
