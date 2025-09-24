import axios from "axios";
import { api } from "@app/utils/constants";


const setHeaders = (token) => {
    return {
        headers: {
            Authorization: "Bearer " + token
        }
    }
}
export const authenticateUser = async (data) => {
    try {
        const response = await axios.post(`${api.url}/login`, data);
        return { user: response.data.user, token: response.data.token, message: response.data.message };
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}

export const unAuthenticateUser = async (token) => {
    try {
        const response = await axios.post(`${api.url}/logout`, {}, setHeaders(token));
        return { user: response.data.user, token: token };
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    }
}

export const fetchEntities = async (token) => {
    try {
        const response = await axios.get(`${api.url}/entity`, setHeaders(token));
        return { entities: response.data.entities, routes: response.data.routes, message: response.data?.message };
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}