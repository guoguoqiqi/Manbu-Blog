<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 21:30:11
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 17:58:28
-->
<template>
  <div class="container">
    <div class="article-box">
      <article-list :list="articleList"></article-list>
      <custom-page :current="current" :total="total"></custom-page>
    </div>
    <div class="right-slide">2222</div>
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";
import CustomPage from "../components/CustomPage.vue";
export default {
  name: "IndexPage",
  components: {
    ArticleList,
    CustomPage,
  },
  data() {
    return {
      articleList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      current: 1,
      total: 50,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 10px auto 0;
  display: flex;
  justify-content: space-between;

  & .article-box {
    width: 730px;
    background-color: #fff;
    padding: 5px 15px;
  }

  & .right-slide {
    width: 250px;
    background-color: #fff;
  }
}
</style>
