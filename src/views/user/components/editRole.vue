<template>
  <el-dialog v-model="showEdit" :title="currTitle" draggable @close="resetForm">
    <el-card>
      <el-form ref="editRoleRef" :model="roleInfoForm" :rules="editRoleRules">
        <el-form-item
          v-show="currTitle === '新增'"
          clearable
          label="新角色名称"
          prop="roleName"
          type="text"
        >
          <el-input v-model="roleInfoForm.roleName"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <span>
        <el-button auto-insert-space @click="submitForm(editRoleRef)"
          >确认</el-button
        >
        <el-button auto-insert-space @click="showEdit = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { RoleInfoData } from "@/type/permissionManagement";
import type { FormInstance } from "element-plus";
import { editUserName } from "@/request/permissionManagement";
const data = new RoleInfoData();
let roleInfoForm = reactive(data.roleInfo);
let showEdit = ref<boolean>(false);
let currTitle = ref("");
const handleAdd = () => {
  currTitle.value = "新增";
  showEdit.value = true;
};

const editRoleRules = {
  roleName: [
    { required: true, message: "请输入角色名称", trigger: "change" },
    { max: 15, min: 6, message: "用户名应为6-15个字符", trigger: "blur" },
  ],
};
const submitForm = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    if ("新增" == currTitle.value) {
      editUserName(data.roleInfo).then((res) => {
        if (res.status != 200) {
          ElMessage({
            message: res.message,
            type: "error",
          });
        } else {
          resetForm();
          showEdit.value = false;
          ElMessage({
            message: res.message,
            type: "success",
          });
          emit("refresh");
        }
      });
    }
  });
};

const editRoleRef = ref<FormInstance>();

const resetForm = () => {
  editRoleRef.value.resetFields();
};
defineExpose({ handleAdd });
</script>

<style scoped></style>
