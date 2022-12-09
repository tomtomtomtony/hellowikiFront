import axios from "axios";
import { getItemlLocalStorage } from "@/stores/storage";

/**
 * 创建axios实例，无需认证
 */
const noAuthorService = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
});
//请求拦截
noAuthorService.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  return config;
});

//响应拦截
noAuthorService.interceptors.response.use(
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

//需认证请求拦截
const authorService = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
//请求拦截
authorService.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  if (getItemlLocalStorage("userAndToken")) {
    config.headers.Authorization =
      "Bearer " + getItemlLocalStorage("userAndToken").token || "";
  } else {
    ElMessage({
      message: "请先登录",
      type: "error",
    });
  }
  return config;
});

//响应拦截
authorService.interceptors.response.use(
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

export default { noAuthorService, authorService };
