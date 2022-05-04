<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 15:07:42
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:58:21
-->
<template>
  <div class="app-layout-header">
    <div class="logo">
      <nuxt-link to="/"><img src="~assets/image/logo3.png" alt="" /></nuxt-link>
    </div>
    <div class="navigation">
      <div class="nav-list">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/messageboard">留言板</nuxt-link>
        <nuxt-link to="/chatroom">聊天室</nuxt-link>
        <a-dropdown>
          <span class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            分类 <a-icon type="down" />
          </span>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <nuxt-link to="/Javascript">Javascript</nuxt-link>
            </a-menu-item>
            <a-menu-item key="1">
              <nuxt-link to="/Vue">Vue</nuxt-link>
            </a-menu-item>
            <a-menu-item key="2">
              <nuxt-link to="/React">React</nuxt-link>
            </a-menu-item>
            <a-menu-item key="3">
              <nuxt-link to="/Node">Node</nuxt-link>
            </a-menu-item>
            <a-menu-item key="4">
              <nuxt-link to="/Webpack">Webpack</nuxt-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <a-input-search
        class="search-input"
        placeholder="搜索漫步博客"
        enter-button
        :maxLength="80"
        allowClear
        @search="onSearch"
      />
    </div>
    <div class="role">
      <a-button type="primary" icon="edit" @click="writeArticle">
        写文章
      </a-button>
      <a-button type="primary" ghost @click="handleLogin" v-show="!isLogin">
        登录
      </a-button>
      <a-dropdown v-show="isLogin" :trigger="['click']">
        <img
          src="https://p3-passport.byteacctimg.com/img/user-avatar/9725017ddc59d2209b92991f5931fbe0~300x300.image"
          alt=""
          style="cursor: pointer"
        />
        <a-menu slot="overlay" @click="onAuthMenuClick">
          <a-menu-item key="self">
            <span>个人中心</span>
          </a-menu-item>
          <a-menu-item key="signout">
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { MessageBox } from "element-ui";

export default {
  computed: mapState({
    isLogin: (state) => state.auth.token !== "",
  }),
  methods: {
    onSearch() {},
    writeArticle() {
      if (!this.isLogin) {
        this.handleLogin();
      } else {
        this.$router.push("/editor");
      }
    },
    handleLogin() {
      this.$store.commit("metaView/SET_LOGIN_VISIBLE", true);
    },
    onAuthMenuClick({ key }) {
      if (key === "self") {
        console.log("个人中心");
      } else if (key === "signout") {
        MessageBox.confirm("退出登录后无法发表文章,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$cookies.remove("TOKEN");
            this.$cookies.remove("USERINFO");
            this.$store.commit("auth/SET_TOKEN", "");
            this.$store.commit("auth/SET_USERINFO", null);
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped lang="less">
.app-layout-header {
  background: @navigation;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: 60px;
  z-index: 250;
  display: flex;
  justify-content: space-between;

  & .logo {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 36px;
    }
  }

  & .navigation {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .nav-list a {
      color: @font-2;
      margin: 0 5px;

      &.nuxt-link-active {
        color: @font-5;
      }
    }

    & .ant-dropdown-link {
      color: @font-2;
      cursor: pointer;
    }

    & .search-input {
      width: 320px;
    }
  }

  & .role {
    width: 230px;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    display: flex;
    padding-right: 20px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 40px;
    }
  }
}
</style>
