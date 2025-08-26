import axios from "axios";
import { useSelector } from "react-redux";
import { api, cms } from "@app/utils/constants";
import { getToken } from "@modules/Auth/reducers/jwt";
import { useNotifier } from "@app/hooks";

export const useSecureRoute = () => {
    const token = useSelector(getToken);

    const get = (url, payload) => {
        return axios.get(api.url + url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: payload,
        });
    };

    const post = (url, data) => {
        return axios.post(api.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    const put = (url, data) => {
        return axios.put(api.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    const remove = (url, data) => {
        return axios.delete(api.url + url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data,
        });
    };

    const patch = (url, data) => {
        return axios.patch(api.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };
    return {
        get,
        post,
        put,
        remove,
        patch,
    };
};

export const useCMSRoute = () => {
    const token = useSelector(getToken);

    const get = (url) => {
        return axios.get(cms.url + url, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    const post = (url, data) => {
        return axios.post(cms.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    const put = (url, data) => {
        return axios.put(cms.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    const remove = (url, data) => {
        return axios.delete(cms.url + url, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data,
        });
    };

    const patch = (url, data) => {
        const notify = useNotifier();
        try {
            if (data instanceof FormData) {
                data.append("_method", "PATCH"); // Ensure the method is set to PATCH
            } else if (typeof data === "object" && data !== null) {
                data = { ...data, _method: "PATCH" }; // Ensure the method is set to PATCH
            }
            return axios.post(cms.url + url, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
        } catch (e) {
            // data is not an object
            console.error("Patch request failed:", e);
            notify("Invalid data format", "error");
        }
    };

    return {
        get,
        post,
        put,
        patch,
        remove,
    };
};
