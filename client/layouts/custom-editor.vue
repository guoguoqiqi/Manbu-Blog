<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 22:44:53
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:39:25
-->
<template>
  <div class="editor-container">
    <Nuxt />
    <login-modal></login-modal>
  </div>
</template>
<script>
import LoginModal from "../components/LoginModal.vue";
export default {
  components: {
    LoginModal,
  },
};
</script>
<style lang="less" scoped>
.editor-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
