import axios from "axios";
import { api } from "@app/utils/constants";

export const authenticateUser = async (data) => {
    try {
        const response = await axios.post(`${api.url}/login`, data);
        return { user: response.data.user, token: response.data.token };
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    };
}

export const unAuthenticateUser = async (token) => {
    try {
        const response = await axios.post(`${api.url}/logout`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return { user: response.data.user, token: token };
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}