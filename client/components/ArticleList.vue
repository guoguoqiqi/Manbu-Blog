<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 17:33:52
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 17:42:53
-->
<template>
  <ul>
    <li class="article-item" v-for="item in list" :key="item">
      <div class="meta-info">222222222222</div>
      <div class="content">222222</div>
      <div class="action-list">2222222222</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style lang="less" scoped>
.article-item {
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  margin-top: 10px;
  width: 100%;
}
</style>
