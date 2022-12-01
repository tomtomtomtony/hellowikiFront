import axios from "axios";
import { getItemlLocalStorage } from "@/stores/storage";

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
});
//请求拦截
service.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (getItemlLocalStorage("userAndToken")?.token) {
    config.headers.Authorization =
      "Bearer " + getItemlLocalStorage("userAndToken").token || "";
  }
  return config;
});

//响应拦截
service.interceptors.response.use(
  (res) => {
    const code: number = res.status;
    if (code != 200) {
      return Promise.reject(res.status);
    }
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
