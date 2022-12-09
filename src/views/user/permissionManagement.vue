<template>
  <el-tabs type="border-card">
    <el-tab-pane label="User">
      <user-manage></user-manage>
    </el-tab-pane>
    <el-tab-pane label="Article">
      <article-manage></article-manage>
    </el-tab-pane>

  </el-tabs>
</template>

<script lang="ts" setup></script>

<style scoped></style>
<script>
import UserManage from "./components/userManage.vue";
import ArticleManage from "./components/articleManage.vue";
export default {
  components: { ArticleManage, UserManage },
}
</script>
