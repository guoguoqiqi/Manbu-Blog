<!--
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 17:57:08
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 22:15:07
-->
<template>
  <a-pagination
    v-model="current"
    :total="total"
    hideOnSinglePage
    show-less-items
    class="custom-page"
    @change="onChange"
  />
</template>
<script>
export default {
  props: ["current", "total"],
  methods: {
    onChange(page, size) {
      console.log(page, size);
      this.$emit("pageChange", { page, size });
    },
  },
};
</script>

<style lang="less" scoped>
.custom-page {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
