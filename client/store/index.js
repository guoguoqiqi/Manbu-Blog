/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:02:24
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:12:53
 */
export const actions = {
  nuxtServerInit(store, { app: { $cookies } }) {
    const token = $cookies.get("TOKEN") ? $cookies.get("TOKEN") : "";
    const userInfo = $cookies.get("USERINFO") ? $cookies.get("USERINFO") : {};

    store.commit("auth/SET_TOKEN", token);
    store.commit("auth/SET_USERINFO", userInfo);
  },
};
