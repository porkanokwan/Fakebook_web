import axios from "axios";
import { getAccessToken } from "../service/localStorage";
import { API_ENDPOINT } from "./env";

axios.defaults.baseURL = API_ENDPOINT;

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    console.log(token); // เป็น null ใน register
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios;
