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
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}

export const fetchEntity = async (data) => {
    try {
        const { path, token } = data;
        const response = await axios.get(`${api.url}/entity/${path}`, setHeaders(token));
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    };
}

export const fetchCRUD = async (data) => {
    const { path, token } = data;
    try {
        const modifiedPath = path !== "" ? `/crud/${path}` : "/crud";
        const response = await axios.get(`${api.url}${modifiedPath}`, setHeaders(token));
        if (response.data?.columns && response.data?.columns.length >= 0) {
            return { columns: response.data.columns };
        }
        if (response.data?.entities && response.data?.entities.length >= 0) {
            return { entities: response.data.entities };
        }
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.message || "Something went wrong");
    }
}