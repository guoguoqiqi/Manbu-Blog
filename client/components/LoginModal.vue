<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:54:02
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:08:45
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
        <div class="login-status" v-if="status === 'login'">
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
        <div class="register-status" v-else>
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
            placeholder="请输入邮箱"
            v-model="registerForm.email"
            type="password"
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
        password: this.loginForm.password,
      });

      console.log(res, "res");

      if (res.result === "1") {
        setTimeout(() => {
          this.loginLoading = false;
          this.$message.success("登录成功");
          this.closeModal();

          // 将用户信息和token同步到 Vuex 和 cookie
          this.$cookies.set("TOKEN", res.rows.token);
          this.$cookies.set("USERINFO", {});
          this.$store.commit("auth/SET_TOKEN", res.rows.token);
          this.$store.commit("auth/SET_USERINFO", {});
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
        password: this.registerForm.password,
        repassword: this.registerForm.password,
        mobile: "manbu0502",
        email: "manbu@manbu.com",
      });

      console.log(res, "res");

      if (res.result === "1") {
        this.$message.success("注册成功，即将前往登录");
        setTimeout(() => {
          this.status = "login";
          this.loginForm = {
            username: res.rows.username,
            password: res.rows.password,
          };
        }, 1000);
      } else {
        this.$message.error(res.msg);
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
  height: 580px;
  display: flex;

  & .face-img {
    width: 500px;

    img {
      height: 580px;
    }
  }

  & .login-form {
    flex: 1;

    .close {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;

      i {
        cursor: pointer;
      }
    }

    .logo {
      margin: 20px 0;
      height: 50px;
      text-align: center;
      img {
        height: 100%;
      }
    }

    .login-status,
    .register-status {
      padding: 5px 10px;

      .register-info {
        text-align: right;
      }

      /deep/ .ant-input {
        height: 50px;
        border-radius: 2px;
        margin-bottom: 10px;
      }

      /deep/ .ant-btn {
        margin-top: 20px;
      }
    }
  }
}
</style>
