<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 15:07:42
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 23:12:11
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
            <a-menu-item :key="category" v-for="category in categories">
              <nuxt-link :to="'/category/' + category">{{
                category
              }}</nuxt-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a href="https://github.com/guoguoqiqi/Manbu-Blog/" target="_blank"
          ><a-icon type="github"
        /></a>
      </div>
      <a-input-search
        class="search-input"
        placeholder="搜索漫步博客"
        enter-button
        :maxLength="80"
        allowClear
        @pressEnter="onPressEnter"
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
      <a-dropdown v-show="isLogin" :trigger="['click', 'hover']">
        <img
          :src="userInfo && userInfo.avator"
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
import { categories } from "../utils/constants";

export default {
  computed: mapState({
    isLogin: (state) => state.auth.token !== "",
    userInfo: (state) => state.auth.userInfo,
  }),
  data() {
    return { categories };
  },
  methods: {
    onSearch(value) {
      this.$router.push("/search?query=" + value);
    },
    onPressEnter(e) {
      this.$router.push("/search?query=" + e.target.value);
    },
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
        this.$router.push("/personal");
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
  display: flex;
  z-index: 250;
  height: 60px;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  background: @navigation;
  justify-content: space-between;
  & .logo {
    display: flex;
    width: 200px;
    height: 100%;
    align-items: center;
    justify-content: center;
    img {
      height: 36px;
    }
  }
  & .navigation {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    & .nav-list a {
      margin: 0 5px;
      color: @font-2;
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
    display: flex;
    width: 230px;
    height: 100%;
    padding-right: 20px;
    align-items: center;
    justify-content: space-around;
    img {
      width: 40px;
      height: 40px;
      border-radius: 40px;
    }
  }
}
</style>
