<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:54:02
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 22:15:46
-->

<template>
  <el-dialog :visible="visible" width="880px">
    <div class="login-box">
      <div class="face-img">
        <img src="~assets/image/login.png" alt="" />
      </div>
      <div class="login-form">
        <div class="close">
          <a-icon
            @click="closeModal"
            type="close"
            :style="{ fontSize: '18px' }"
          />
        </div>
        <div class="logo"><img src="~assets/image/logo3.png" alt="" /></div>
        <div class="login-status" v-show="status === 'login'">
          <a-input
            placeholder="请输入用户名"
            v-model="loginForm.username"
            :maxLength="20"
          />
          <a-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            type="password"
            :maxLength="20"
          />
          <div class="register-info">
            <a-button type="link" @click="status = 'register'"
              >没有账号？点击注册</a-button
            >
          </div>
          <a-button
            type="primary"
            size="large"
            block
            @click="userLogin"
            :loading="loginLoading"
          >
            登录
          </a-button>
          <a-button size="large" block @click="closeModal"> 访客模式 </a-button>
        </div>
        <div class="register-status" v-show="status !== 'login'">
          <a-input
            placeholder="请输入用户名"
            v-model="registerForm.username"
            :maxLength="20"
          />
          <a-input
            placeholder="请输入昵称"
            v-model="registerForm.nickname"
            :maxLength="20"
          />
          <a-input
            placeholder="请输入密码（长度6-20位）"
            v-model="registerForm.password"
            type="password"
            :maxLength="20"
          />
          <a-input
            placeholder="请输入邮箱（随便填~~）"
            v-model="registerForm.email"
            :maxLength="20"
          />
          <div class="register-info">
            <a-button type="link" @click="status = 'login'"
              >已有账号，前往登录</a-button
            >
          </div>
          <a-button type="primary" size="large" block @click="userRegister">
            注册
          </a-button>
          <a-button size="large" block @click="closeModal"> 访客模式 </a-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Dialog } from "element-ui";
import { mapState } from "vuex";
import { md5EncryHex } from "../utils/md5";
export default {
  components: {
    "el-dialog": Dialog,
  },
  computed: mapState({
    visible: (state) => state.metaView.loginVisible,
  }),
  data() {
    return {
      status: "login",
      loginLoading: false,
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        nickname: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("metaView/SET_LOGIN_VISIBLE", false);
    },
    async userLogin() {
      if (!this.loginForm.username) {
        this.$message.error("请输入用户名");
        return false;
      }
      if (!this.loginForm.password) {
        this.$message.error("请输入密码");
        return false;
      }

      this.loginLoading = true;
      const res = await this.$api.login({
        username: this.loginForm.username,
        password: md5EncryHex(this.loginForm.password),
      });

      if (res.result === "1") {
        setTimeout(() => {
          this.loginLoading = false;
          this.$message.success("登录成功");
          this.closeModal();

          // 将用户信息和token同步到 Vuex 和 cookie
          this.$cookies.set("TOKEN", res.rows.token);
          this.$store.commit("auth/SET_TOKEN", res.rows.token);
          this.getUserInfo(this.loginForm.username);
        }, 1000);
      } else {
        this.$message.error(res.msg);
        this.loginLoading = false;
      }
    },
    async userRegister() {
      if (!this.registerForm.username) {
        this.$message.error("请输入用户名");
        return false;
      }
      if (!this.registerForm.nickname) {
        this.$message.error("请输入昵称");
        return false;
      }
      if (!this.registerForm.password) {
        this.$message.error("请输入密码");
        return false;
      }
      if (
        this.registerForm.password.length > 20 ||
        this.registerForm.password.length < 6
      ) {
        this.$message.error("密码的长度在6-20位");
        return false;
      }
      if (!this.registerForm.email) {
        this.$message.error("请输入邮箱");
        return false;
      }

      const res = await this.$api.register({
        username: this.registerForm.username,
        nickname: this.registerForm.nickname,
        password: md5EncryHex(this.registerForm.password),
        repassword: md5EncryHex(this.registerForm.password),
        mobile: "manbu0502",
        email: "manbu@manbu.com",
      });

      if (res.result === "1") {
        this.$message.success("注册成功，即将前往登录");
        setTimeout(() => {
          this.status = "login";
          this.loginForm = {
            username: this.registerForm.username,
            password: this.registerForm.password,
          };
        }, 1000);
      } else {
        this.$message.error(res.msg);
      }
    },
    async getUserInfo(username) {
      const res = await this.$api.getUserInfo("", {
        username,
      });

      if (res.result === "1") {
        this.$cookies.set("USERINFO", res.rows);
        this.$store.commit("auth/SET_USERINFO", res.rows);
      } else {
        this.$message.error("查询用户信息失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-dialog__header {
  display: none;
}
/deep/ .el-dialog__footer {
  display: none;
}
/deep/ .el-dialog__body {
  padding: 0;
}
.login-box {
  display: flex;
  height: 580px;
  & .face-img {
    width: 500px;
    img {
      height: 580px;
    }
  }
  & .login-form {
    flex: 1;
    .close {
      display: flex;
      height: 30px;
      padding-right: 10px;
      align-items: center;
      justify-content: flex-end;
      i {
        cursor: pointer;
      }
    }
    .logo {
      height: 50px;
      margin: 20px 0;
      text-align: center;
      img {
        height: 100%;
      }
    }
    .login-status,
    .register-status {
      padding: 5px 20px;
      .register-info {
        text-align: right;
      }
      /deep/ .ant-input {
        height: 45px;
        margin-bottom: 10px;
        border-radius: 2px;
      }
      /deep/ .ant-btn {
        margin-top: 20px;
      }
    }
  }
}
</style>
