/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-04 21:35:16
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-04 22:36:35
 */
module.exports = {
  apps: [
    {
      name: "Manbu_blog_Client_SSR",
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
    },
  ],
};
