<template>
  <el-tabs type="border-card">
    <el-tab-pane label="User">
      <template>
        <user-manage></user-manage>
      </template>
    </el-tab-pane>
    <el-tab-pane label="Article">
    </el-tab-pane>

  </el-tabs>
</template>

<script lang="ts" setup>
import UserManage from "@/views/user/components/userManage.vue"

</script>

<style scoped></style>
