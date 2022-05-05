<template>
  <div class="list-wrapper">
    <ul class="list-ul-box">
      <li
        class="list-li-item"
        v-for="item in articleList"
        :key="item.blog_id"
        @click="toDetailPage(item.blog_id)"
      >
        <a-skeleton :loading="loading">
          <div class="meta-info">
            <a-breadcrumb separator="|">
              <a-breadcrumb-item>{{ item.username }}</a-breadcrumb-item>
              <a-breadcrumb-item>{{
                item.publish_time | formatDate
              }}</a-breadcrumb-item>
              <a-breadcrumb-item>{{ item.blog_tags }}</a-breadcrumb-item>
            </a-breadcrumb>
          </div>
          <div class="wrapper">
            <div class="content">
              <div class="title">{{ item.blog_title }}</div>
              <div class="describtion">{{ item.describtion }}</div>
              <ul class="action-list">
                <li>
                  <a-icon type="eye" /><span>{{ item.read_count }}</span>
                </li>
                <li>
                  <a-icon type="like" /><span>{{ item.like_count }}</span>
                </li>
                <li><a-icon type="message" /><span>评论</span></li>
              </ul>
            </div>
            <div class="thumbnail">
              <img :src="item.thumbnail" :alt="item.blog_title" />
            </div></div
        ></a-skeleton>
      </li>
    </ul>
    <a-pagination
      v-model="pageIndex"
      :total="total"
      hideOnSinglePage
      show-less-items
      @change="handlePageChange"
    />
  </div>
</template>
<script>
const PageSize = 10;
export default {
  data() {
    return {
      articleList: [],
      total: 0,
      loading: false,
      pageIndex: 1,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    toDetailPage(id) {
      this.$router.push("/article/" + id);
    },
    handlePageChange(page) {
      document.body.scrollIntoView({
        behavior: "auto",
      });
      this.pageIndex = page;
      this.fetchData();
    },
    fetchData() {
      this.loading = true;
      this.$api
        .getArticleList("", {
          pageIndex: this.pageIndex,
          pageSize: PageSize,
        })
        .then((res) => {
          this.articleList = res.rows;
          this.total = res.total;
          setTimeout(() => {
            this.loading = false;
          }, 1050);
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style lang="less" scoped>
.list-li-item {
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  cursor: pointer;
  flex-direction: column;
  & .wrapper {
    display: flex;
    justify-content: space-between;
    & .content {
      margin-top: 10px;
      & .title {
        display: -webkit-box;
        width: 100%;
        overflow: hidden;
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        color: #1d2129;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      & .describtion {
        display: -webkit-box;
        overflow: hidden;
        margin: 5px 0;
        font-size: 13px;
        line-height: 22px;
        color: #86909c;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      & .action-list {
        display: flex;
        span {
          margin-right: 15px;
          margin-left: 3px;
          font-size: 13px;
          line-height: 20px;
          vertical-align: top;
          color: #4e5969;
          cursor: pointer;
        }
      }
    }
    & .thumbnail {
      display: flex;
      width: 120px;
      margin-left: 15px;
      align-items: flex-end;
      justify-content: center;
      img {
        width: 120px;
      }
    }
  }
}
.custom-spin {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
