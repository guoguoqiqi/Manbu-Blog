/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 21:08:16
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 16:54:38
 */

export default {
  getArticleList: {
    url: `/blog/get-blog-list`,
    method: "get",
    header: {},
  },
  publishArticle: {
    url: `/blog/publish_blog`,
    method: "post",
    header: {},
  },
  getArticleDetail: {
    url: `/blog/get-blog-detail`,
    method: "get",
    header: {},
  },
};
