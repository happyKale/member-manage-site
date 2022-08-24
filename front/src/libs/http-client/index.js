import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

export const API = {
  get: async (url) => {
    const result = await instance.get(url);
    return result;
  },
  post: async (url, data) => {
    const result = await instance.post(url, data);
    return result;
  },
  patch: async (url, data) => {
    const result = await instance.patch(url, data);
    return result;
  },
};
