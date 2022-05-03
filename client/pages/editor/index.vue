<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:35:36
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:47:21
-->
<template>
  <div class="editor-box">
    <div class="header">
      <a-input
        class="left-box"
        placeholder="请输入文章标题"
        :maxLength="50"
        v-model="articleTitle"
      ></a-input>
      <div class="right-box">
        <a-button icon="rollback" @click="$router.go(-1)">取消</a-button>
        <a-button icon="save">保存至草稿</a-button>
        <a-button type="primary" @click="showPublishModal">发布</a-button>
      </div>
    </div>
    <div class="content-body">
      <mavon-editor
        ref="md"
        placeholder="请输入文档内容..."
        :boxShadow="false"
        style="z-index: 1; border: 1px solid #d9d9d9; height: 100%"
        v-model="content"
        :toolbars="toolbars"
        @imgAdd="$imgAdd"
      />
    </div>
    <a-modal
      title="发布文章"
      :visible="visible"
      :width="800"
      okText="确认发布"
      cancelText="取消发布"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-spin :spinning="spinning">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-form-item label="标题">
            <a-input
              v-decorator="[
                'title',
                {
                  rules: [{ required: true, message: '标题不能为空' }],
                },
              ]"
              placeholder="请输入文章标题"
              :maxLength="50"
            />
          </a-form-item>
          <a-form-item label="分类">
            <a-select
              v-decorator="[
                'tags',
                {
                  rules: [{ required: true, message: '分类不能为空' }],
                },
              ]"
              placeholder="选择文章分类标签"
            >
              <a-select-option value="Vue"> Vue </a-select-option>
              <a-select-option value="Javascript"> Javascript </a-select-option>
              <a-select-option value="React"> React </a-select-option>
              <a-select-option value="Node"> Node </a-select-option>
              <a-select-option value="CSS"> CSS </a-select-option>
              <a-select-option value="HTML"> HTML </a-select-option>
              <a-select-option value="Nginx"> Nginx </a-select-option>
              <a-select-option value="算法"> 算法 </a-select-option>
              <a-select-option value="网络"> 网络 </a-select-option>
              <a-select-option value="工程化"> 工程化 </a-select-option>
              <a-select-option value="数据结构"> 数据结构 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="封面">
            <a-upload
              name="thumbnail"
              list-type="picture-card"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                class="face-img"
                v-if="imageUrl"
                :src="imageUrl"
                alt="文章封面"
              />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="摘要">
            <a-textarea
              v-decorator="[
                'describtion',
                {
                  rules: [{ required: true, message: '摘要不能为空' }],
                },
              ]"
              placeholder="请输入文章摘要"
              :rows="4"
              :maxLength="100"
            />
          </a-form-item> </a-form
      ></a-spin>
    </a-modal>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { defaultFaceImage } from "~/utils/constants.js";
export default {
  name: "home",
  layout: "custom-editor",
  components: {},
  data() {
    return {
      content: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      visible: false,
      loading: false,
      spinning: false,
      imageUrl: "",
      articleTitle: "",
      form: this.$form.createForm(this, { name: "article_form" }),
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.content) {
      MessageBox.confirm("当前编辑的内容将不会保存,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
  created() {
    Object.freeze(this.toolbars);
  },
  methods: {
    // 上传图片方法
    $imgAdd(pos, $file) {
      console.log(pos, $file);
    },
    showPublishModal() {
      this.visible = true;
      console.log(this.form, "form");
      this.$nextTick(() => {
        this.form.setFieldsValue({ title: this.articleTitle });
      });
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.info("success");

          if (!this.content) {
            this.$message.error("文章内容不能为空");
            return;
          }

          this.spinning = true;

          this.$api
            .publishArticle({
              username: "admin",
              blog_title: values.title,
              blog_tags: values.tags,
              blog_content: this.content,
              describtion: values.describtion,
              thumbnail: this.imageUrl || defaultFaceImage,
            })
            .then((res) => {
              if (res.result === "1") {
                setTimeout(() => {
                  this.$message.success(res.msg);
                  this.spinning = false;
                  this.content = "";
                  this.$router.push("/");
                }, 1000);
              } else {
                this.spinning = false;
              }
            })
            .catch(() => {
              this.spinning = false;
            });
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.form.resetFields();
    },
    handleChange({ file }) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        this.$message.error("仅支持图片类型文件");
        return false;
      }

      this.loading = true;

      /**
       * 使用的第三方图床
       * https://www.imgurl.org/vip/manage/upload
       */
      const formData = new FormData();
      formData.append("token", "572590c6db0b0b3a26a1913f0b224202");
      formData.append("uid", "98b91c47547b1b38ac521db2012e926a");
      formData.append("file", file);

      this.$axios({
        url: "https://www.imgurl.org/api/v2/upload",
        method: "post",
        data: formData,
        _custom: {
          noauthorization: true,
        },
      })
        .then((res) => {
          if (res.code !== 200) {
            this.$message.error(res.msg);
          } else {
            this.imageUrl = res.data.url;
          }
        })
        .catch(() => {
          this.$message.error("上传失败请重试");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    beforeUpload() {
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
.editor-box {
  height: 100%;

  & .header {
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;

    .left-box {
      flex: 1;
      height: 100%;
      font-size: 24px;
      font-weight: 500;
      color: #1d2129;
      border: none;
      outline: none;
      text-indent: 15px;

      &.ant-input:focus {
        border: none;
        box-shadow: none;
      }
    }

    .right-box {
      width: 350px;
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;

      & .ant-btn {
        margin-right: 20px;
      }
    }
  }

  & .content-body {
    height: calc(100vh - 60px);
  }
}
/deep/ .ant-upload {
  width: 180px;
  height: 120px;
}

.face-img {
  height: 120px;
}
</style>
