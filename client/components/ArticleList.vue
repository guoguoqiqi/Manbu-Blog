<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 17:33:52
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 17:03:38
-->
<template>
  <ul>
    <li
      class="article-item"
      v-for="item in list"
      :key="item.blog_id"
      @click="enterArticleDetail(item.blog_id)"
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
          </div>
        </div>
      </a-skeleton>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["list", "loading"],
  methods: {
    enterArticleDetail(val) {
      console.log(val);
      this.$router.push("/article/" + val);
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  margin-top: 10px;
  width: 100%;
  cursor: pointer;

  & .wrapper {
    display: flex;
    justify-content: space-between;

    & .content {
      margin-top: 10px;
      & .title {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      & .describtion {
        color: #86909c;
        font-size: 13px;
        line-height: 22px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin: 5px 0;
      }

      & .action-list {
        display: flex;

        span {
          font-size: 13px;
          line-height: 20px;
          color: #4e5969;
          vertical-align: top;
          margin-right: 15px;
          margin-left: 3px;
          cursor: pointer;
        }
      }
    }

    & .thumbnail {
      width: 120px;
      margin-left: 15px;
      display: flex;
      align-items: flex-end;
      justify-content: center;

      img {
        width: 120px;
      }
    }
  }
}
</style>
