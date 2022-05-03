<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 20:33:46
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 23:00:04
-->
<template>
  <div class="article-detail-content">
    <div class="content-mian">
      <a-skeleton :loading="loading"
        ><h1 class="article-title">{{ title }}</h1>
        <div class="author-info-block">
          <div class="avatar-link">
            <img
              src="https://p26-passport.byteacctimg.com/img/user-avatar/848d36b5efa8e055ab080bff4f27e669~300x300.image"
              alt="用户头像"
              class="avatar"
            />
          </div>
          <div class="author-info-box">
            <div class="author-name">
              <span class="name" style="max-width: 128px">{{ username }}</span>
            </div>
            <div class="meta-box">
              <span>{{ publishTime | formatDate }}</span>
              <span class="views-count">
                ·&nbsp;&nbsp;阅读 {{ readCount }}
              </span>
            </div>
          </div>
        </div>
        <div class="article-content">
          <no-ssr>
            <mavon-editor
              :value="content"
              :subfield="false"
              :defaultOpen="'preview'"
              :toolbarsFlag="false"
              :editable="false"
              :scrollStyle="true"
            ></mavon-editor>
          </no-ssr></div
      ></a-skeleton>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    $route: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
  data() {
    return {
      title: "",
      username: "",
      publishTime: "",
      content: "",
      readCount: 0,
      loading: true,
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    async getArticleDetail() {
      const res = await this.$api.getArticleDetail("", {
        blog_id: this.$route.params.id,
      });

      if (res.result === "1") {
        this.title = res.rows.blog_title;
        this.username = res.rows.username;
        this.publishTime = res.rows.publish_time;
        this.content = res.rows.blog_content;
        this.readCount = res.rows.read_count;
        this.faceImage = res.rows.thumbnail;

        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        this.$message.error("未查询到文章");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.content-mian {
  width: 830px;
  min-height: calc(100vh - 50px);
  background-color: #fff;
  margin: 10px auto 0;
  padding: 20px;

  & h1.article-title {
    margin: 0 0 20px;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.31;
    color: #252933;
  }

  & .author-info-block {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & .avatar-link {
      width: 50px;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 35px;
      }
    }

    & .author-info-box {
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      & .author-name {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 500;
        color: #515767;
      }

      & .meta-box {
        color: #8a919f;
      }
    }
  }

  & .article-content {
    .v-note-wrapper.markdown-body {
      box-shadow: none !important;
    }
  }
}
</style>
