/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:53:05
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:01:11
 */

export const state = () => ({
  loginVisible: false,
});

export const mutations = {
  SET_LOGIN_VISIBLE(state, val) {
    state.loginVisible = val;
  },
};
