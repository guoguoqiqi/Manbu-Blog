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
          <client-only>
            <p v-html="$md.render(renderContent)" v-highlight></p>
          </client-only>
        </div>
      </a-skeleton>
    </div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import { decode64 } from "../../utils/base64.js";
export default {
  watch: {
    $route: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
  },
  computed: {
    renderContent() {
      return decode64(this.content);
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
      clipboard: null,
    };
  },
  mounted() {
    this.getArticleDetail();
    setTimeout(() => {
      this.creatCopyBtn();
      this.copy();
    }, 1000);
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
    creatCopyBtn() {
      const codeDoms = document.querySelectorAll("pre");
      let i = document.createElement("i");
      i.setAttribute("class", "el-icon-copy-document hljs-copy");
      i.setAttribute("data-clipboard-action", "copy");
      console.log(codeDoms, "codeDoms");
      Array.from(codeDoms).forEach((item, index) => {
        let dom = i.cloneNode(false);
        let i_text = document.createTextNode("复制");
        dom.appendChild(i_text);
        dom.setAttribute("data-clipboard-target", "#copy" + index);
        item.appendChild(dom);
        let child = item.children[0];
        child.setAttribute("id", "copy" + index);

        // 添加行号
        // let num = item.innerText.split("\n").length - 1;
        // let ul = document.createElement("ul");
        // ul.setAttribute("class", "hljs-line-num");
        // for (let i = 0; i < num; i++) {
        //   let n = i + 1;
        //   let childLi = document.createElement("li");
        //   let li_text = document.createTextNode(n);
        //   childLi.appendChild(li_text);
        //   ul.appendChild(childLi);
        // }
        // item.appendChild(ul);
      });
    },
    copy() {
      this.$nextTick(() => {
        this.clipboard = new Clipboard(".hljs-copy");
        this.clipboard.on("success", (e) => {
          // console.log(e)
          this.$message.success("复制成功");
          e.clearSelection(); // 清除文本的选中状态
        });
        this.clipboard.on("error", (e) => {
          this.$message.error("复制失败");
          e.clearSelection(); // 清除文本的选中状态
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content-mian {
  width: 830px;
  min-height: calc(100vh - 50px);
  margin: 10px auto 0;
  padding: 20px;
  background-color: #fff;
  & h1.article-title {
    margin: 0 0 20px;
    font-size: 28px;
    line-height: 1.31;
    font-weight: 600;
    color: #252933;
  }
  & .author-info-block {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: flex-start;
    & .avatar-link {
      display: flex;
      width: 50px;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      img {
        height: 35px;
      }
    }
    & .author-info-box {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      & .author-name {
        width: 150px;
        overflow: hidden;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        color: #515767;
        text-overflow: ellipsis;
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
<style lang="less" scoped>
/deep/ pre {
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  background: #fff;
  border-radius: 3px;
  .hljs {
    display: block;
    padding: 15px 12px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
    color: #333;
    background: #f8f8f8;
    word-break: normal;
    overflow-x: auto;
  }
  .hljs-copy {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    line-height: 20px;
    cursor: pointer;
  }
  .hljs-line-num {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 100%;
    padding: 12px 4px 12px 0;
    border-right: 1px solid #c3ccd0;
    font-family: Menlo, monospace;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    color: #aaa;
    background-color: #eee;
    border-radius: 3px 0 0 3px;
  }
  &:hover {
    cursor: pointer;
    .hljs-copy {
      display: inline;
    }
  }
}

</style>
