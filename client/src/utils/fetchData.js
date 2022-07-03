import axios from "axios";
import { BASE_URL } from "./config";
import { isEmpty } from "lodash";

export const setupAxios = (axios, store) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!isEmpty(error.response)) {
        if (error.response.data.msg === "jwt expired") {
          //log user out if token expires
          store.dispatch({ type: "logout" });
        }
      }
      return Promise.reject(error);
    }
  );
};

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
