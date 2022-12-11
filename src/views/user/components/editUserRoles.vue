<template>
  <div ref="addEditRolesRef">
    <el-dialog v-model="showEdit" title="编辑角色">
      <el-form> </el-form>
      <template #footer>
        <span>
          <el-button auto-insert-space>确认</el-button>
          <el-button auto-insert-space>取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

let showEdit = ref<boolean>(false);
const handleEdit = () => {
  showEdit.value = true;
};
defineExpose({ handleEdit });
</script>

<style scoped></style>
