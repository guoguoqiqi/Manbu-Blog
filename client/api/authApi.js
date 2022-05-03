/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:08:34
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 18:53:52
 */
export default {
  login: {
    url: `/user/login`,
    method: "post",
    header: {},
  },
  register: {
    url: `/user/register`,
    method: "post",
    header: {},
  },
  getUserInfo: {
    url: `/user/get-user-info`,
    method: "get",
    header: {},
  },
};
