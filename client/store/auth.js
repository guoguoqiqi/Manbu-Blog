/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:02:19
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:02:39
 */
export const state = () => ({
  token: "",
  userInfo: null,
});

export const mutations = {
  SET_TOKEN(state, val) {
    state.token = val;
  },
  SET_USERINFO(state, val) {
    state.userInfo = val;
  },
  SIGN_OUT(state) {
    state.token = "";
    state.userInfo = null;
  },
};
