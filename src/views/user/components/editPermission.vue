<template></template>

<script lang="ts" setup>
import { PermissionInfoData} from "@/type/permissionManagement";
import { reactive, ref } from "vue";

const data = new PermissionInfoData();
let permissionInfoForm = reactive(data.permissionInfo);
let showEdit = ref<boolean>(false);
let currTitle = ref("");
const handleAdd = () => {
  currTitle.value = "新增";
  showEdit.value = true;
};
defineExpose({ handleAdd });
</script>

<style scoped></style>
