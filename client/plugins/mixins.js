/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:47:20
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 21:48:41
 */

import Vue from "vue";
import filters from "../filters";

// 注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
