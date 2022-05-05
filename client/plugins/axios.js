/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:00:35
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 21:22:50
 */
// 导入暴漏出来的api
import apiEntire from "@/api";
import { message } from "ant-design-vue";
export default ({ app, $axios, store, redirect }, inject) => {
  // $axios.defaults.baseURL =
  //   process.env.NODE_ENV === "development"
  //     ? "http://106.55.228.251:5002/manbu-blog-v1"
  //     : "http://106.55.228.251:5002/manbu-blog-v1";

  $axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5002/manbu-blog-v1"
      : "http://106.55.228.251:5002/manbu-blog-v1";
  $axios.defaults.timeout = 5000;

  // 请求拦截
  $axios.onRequest((config) => {
    // 本项目token 存储在vuex里面
    const { _custom } = config;
    const token = store.state.auth.token;
    if (token && !(_custom && _custom.noauthorization)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  });

  // 服务器返回异常拦截
  $axios.onError((error) => {
    if (error.response.status === 401) {
      message.error("身份认证已过期,请重新登录");
      store.commit("auth/SET_TOKEN", "");
      store.commit("auth/SET_USERINFO", null);
      store.commit("metaView/SET_LOGIN_VISIBLE", true);
    }
    return error;
  });

  // 接口数据返回拦截
  $axios.onResponse((response) => {
    return response.data;
  });

  const API = {};
  for (const i in apiEntire) {
    // 调用api时候的参数
    // 第一位为 post参数 第二位为get参数
    API[i] = function (data = "", params = "") {
      const { url, method, headers } = { ...apiEntire[i] };
      return $axios({
        url,
        method,
        headers,
        data,
        params,
      });
    };
  }
  app.api = API;
  inject("api", API);
};
