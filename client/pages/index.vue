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
        <article-list :list="articleList" :loading="loading"></article-list>
      </div>
      <custom-page
        :current="current"
        :total="total"
        @pageChange="onPageChange"
      ></custom-page>
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
  async asyncData(ctx) {
    const [article] = await Promise.all([
      ctx.$api.getArticleList("", {
        pageIndex: 1,
        pageSize: 10,
      }),
    ]);
    return {
      articleList: article.rows,
      total: article.total,
      current: 1,
      loading: false,
    };
  },
  methods: {
    async onPageChange({ page, size }) {
      this.loading = true;
      const article = await this.$api.getArticleList("", {
        pageIndex: page,
        pageSize: size,
      });

      this.articleList = article.rows;
      this.total = article.total;
      this.current = page;

      setTimeout(() => {
        this.loading = false;
      }, 500);

      document.body.scrollIntoView({
        behavior: "auto",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 10px auto 0;
  display: flex;
  justify-content: space-between;

  & .content-main {
    width: 730px;
    background-color: #fff;
    padding: 5px 15px;

    & .article-box {
      min-height: 800px;
    }
  }

  & .right-slide {
    width: 250px;
    background-color: #fff;
  }
}
</style>
