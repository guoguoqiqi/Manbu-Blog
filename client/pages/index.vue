<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 21:30:11
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 18:41:24
-->
<template>
  <div class="container">
    <div class="content-main">
      <div class="article-box">
        <infinite-article-list></infinite-article-list>
      </div>
    </div>
    <div class="right-slide">2222</div>
  </div>
</template>

<script>
import InfiniteArticleList from "../components/InfiniteArticleList.vue";
export default {
  name: "IndexPage",
  components: {
    InfiniteArticleList,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 1000px;
  margin: 10px auto 0;
  justify-content: space-between;
  & .content-main {
    width: 730px;
    padding: 5px 15px;
    background-color: #fff;
    & .article-box {
      position: relative;
      min-height: 600px;
    }
  }
  & .right-slide {
    width: 250px;
    background-color: #fff;
  }
}

</style>
