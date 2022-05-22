import { getToken } from "./../helpers/storage";
import axios from "axios";
import { store } from "../redux/store";
import { updateIsLogin } from "../redux/slices/userSlice";
export const baseUrl =
  "https://6t8b0n7392.execute-api.ap-northeast-2.amazonaws.com/api/v1/";

export const API = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
API.interceptors.request.use(
  async (config: any) => {
    console.log("config", config);
    const accessToken = getToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  async function (err) {
    console.log("err root", err.response);

    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/sign-in" && err.response) {
      if (err.response.data.errorCode === 1003) {
        store.dispatch(updateIsLogin({ updateIsLogin: false }));
      }
    }
    console.log(err.response);
    return Promise.reject(err);
  }
);
