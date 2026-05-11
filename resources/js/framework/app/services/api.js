import axios from 'axios';
import { api } from '@app/constants';

const setHeaders = (customHeaders) => {
  const { token } = customHeaders || {};
  return {
    headers: {
      ...customHeaders,
      Authorization: 'Bearer ' + token,
    },
  };
};

export const postRequest = async (data) => {
  try {
    const { token, endpoint } = data;
    if (data instanceof FormData) {
      const { token, endpoint } = Object.fromEntries(data);
      const response = await axios.post(
        `${api.url}/${endpoint}`,
        data,
        setHeaders({ token: token })
      );
      return response?.data;
    }
    const response = await axios.post(`${api.url}/${endpoint}`, data, setHeaders({ token: token }));
    return response?.data;
  } catch (e) {
    throw new Error(e.response?.data?.message || 'Something went wrong');
  }
};

export const getRequest = async (data) => {
  try {
    const { token, endpoint, headers } = data;
    const response =
      api.url && (await axios.get(`${api.url}/${endpoint}`, setHeaders({ ...headers, token })));
    return response?.data;
  } catch (e) {
    throw new Error(e.response.data.message || 'Something went wrong');
  }
};

export const updateRequest = async (payload) => {
  try {
    const { endpoint, token, data, method } = payload;
    if (payload instanceof FormData) {
      const { token, endpoint, method } = Object.fromEntries(payload);
      const response = await axios[method](`${api.url}/${endpoint}`, payload, setHeaders({ token }));
      return response?.data;
    }
    const response = await axios[method](`${api.url}/${endpoint}`, data, setHeaders({ token }));
    return response?.data;
  } catch (e) {
    console.error(e);
    throw new Error(e.response?.data.message || 'Something went wrong');
  }
};
