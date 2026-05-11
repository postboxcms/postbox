import axios from "axios";
import { api, cms } from "@app/constants";
import { useAuth } from "@app/hooks";

export const useSecureRoute = () => {
    const { token } = useAuth();

    const get = (url, payload, customHeaders = {}) => {
        return url && axios.get(api.url + url, {
            headers: {
                ...customHeaders?.headers,
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
    const { token } = useAuth();

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
        return axios.patch(cms.url + url, data, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    };

    return {
        get,
        post,
        put,
        patch,
        remove,
    };
};
