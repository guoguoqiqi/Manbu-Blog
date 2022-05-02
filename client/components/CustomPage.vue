<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 17:57:08
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 17:59:30
-->
<template>
  <a-pagination
    v-model="current"
    :total="total"
    hideOnSinglePage
    show-less-items
    class="custom-page"
  />
</template>
<script>
export default {
  props: ["current", "total"],
};
</script>

<style lang="less" scoped>
.custom-page {
  margin-top: 15px;
}
</style>
