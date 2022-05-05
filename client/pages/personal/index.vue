<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-05 21:31:13
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 22:59:46
-->
<template>
  <div class="personal-box">
    <a-spin :spinning="loading">
      <h2 class="title">用户信息</h2>
      <a-form
        labelAlign="left"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
      >
        <a-form-item label="头像">
          <a-upload
            name="avator"
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              class="user-avator"
              v-show="userForm.avator"
              :src="userForm.avator"
              alt="用户头像"
            />
            <div v-show="!userForm.avator">
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model="userForm.nickname" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model="userForm.username" disabled />
        </a-form-item>
        <a-form-item label="加入时间">
          <a-input v-model="userForm.createtime" disabled />
        </a-form-item>
      </a-form>
      <div class="bottom-btns">
        <a-button @click="$router.go(-1)">取消</a-button>
        <a-button @click="handleComfirmClick">确认修改</a-button>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { mapState } from "vuex";
import formatDate from "../../filters/formatDate";
export default {
  computed: mapState({
    username: (state) => state.auth.userInfo.username,
    userInfo: (state) => state.auth.userInfo,
  }),
  data() {
    return {
      userForm: {
        avator: "",
        nickname: "",
        username: "",
        createtime: "",
      },
      loading: false,
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取最新的用户信息
    async getUserInfo() {
      const res = await this.$api.getUserInfo("", {
        username: this.username,
      });

      if (res.result === "1") {
        this.userForm.avator = res.rows.avator;
        this.userForm.nickname = res.rows.nickname;
        this.userForm.username = res.rows.username;
        this.userForm.createtime = formatDate(res.rows.createtime);
      } else {
        this.$message.error("查询用户信息失败");
      }
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
            this.userForm.avator = res.data.url;
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
    handleComfirmClick() {
      if (!this.userForm.nickname) {
        this.$message.warning("昵称不能为空");
        return false;
      }

      if (
        this.userForm.nickname === this.userInfo.nickname &&
        this.userForm.avator === this.userInfo.avator
      ) {
        this.$message.warning("没有修改哦");
        return false;
      }
      this.loading = true;

      this.$api
        .updateUserInfo({
          username: this.username,
          nickname: this.userForm.nickname,
          avator: this.userForm.avator,
        })
        .then((res) => {
          if (res.result === "1") {
            this.$message.success(res.msg);
            this.$cookies.set("USERINFO", res.rows);
            this.$store.commit("auth/SET_USERINFO", res.rows);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.personal-box {
  width: 600px;
  height: 500px;
  background-color: #fff;
  margin: 20px auto;
  padding: 20px;

  & h2.title {
    padding-bottom: 15px;
  }

  & .user-avator {
    width: 80px;
    height: 80px;
  }

  & .bottom-btns {
    display: flex;
    justify-content: flex-end;

    .ant-btn {
      margin-left: 10px;
    }
  }
}
</style>
