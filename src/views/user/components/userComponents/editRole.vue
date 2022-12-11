<template>
  <el-dialog title="编辑角色" v-show="showEdit">
    <el-form>
      <el-button auto-insert-space>确认</el-button>
      <el-button auto-insert-space>取消</el-button>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let showEdit = ref<boolean>(false);
const handlEdit = (userid: number) => {
  showEdit.value = true;
};
defineExpose({
  handlEdit,
});
</script>

<style scoped></style>
