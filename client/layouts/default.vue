<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 15:07:58
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 19:14:41
-->
<template>
  <div>
    <custom-header></custom-header>
    <Nuxt style="overflow: auto" />
    <custom-footer></custom-footer>
    <back-top></back-top>
    <login-modal></login-modal>
  </div>
</template>

<script>
import customHeader from "./custom-header";
import customFooter from "./custom-footer";
import BackTop from "../components/BackTop.vue";
import LoginModal from "../components/LoginModal.vue";

export default {
  components: {
    customHeader,
    customFooter,
    BackTop,
    LoginModal,
  },
};
</script>
