import axios from "axios";
import { api } from "@app/utils/constants";


const setHeaders = (token) => {
    return {
        headers: {
            Authorization: "Bearer " + token
        }
    }
}

export const postRequest = async (data) => {
    try {4
        const response = await axios.post(`${api.url}/${data.endpoint}`, data, setHeaders(data.token));
        return response?.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}

export const getRequest = async (data) => {
    try {
        const response = await axios.get(`${api.url}/${data.endpoint}`, setHeaders(data.token));
        return response?.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}

export const updateRequest = async (payload) => {
    try {
        const  { endpoint, token, data, method } = payload;
        const response = await axios[method](`${api.url}/${endpoint}`, data, setHeaders(token));
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    }
}