<template>
  <el-dialog v-model="showEdit" :title="currTitle" draggable @close="resetForm">
    <el-card>
      <el-form
        ref="editPermissionRef"
        :model="permissionInfoForm"
        :rules="editPermissionRules"
      >
        <el-form-item
          v-if="currTitle === '新增'"
          clearable
          label="新权限名称"
          prop="permissionName"
          type="text"
        >
          <el-input v-model="permissionInfoForm.permissionName"></el-input>
        </el-form-item>
        <el-form-item
          v-if="currTitle === '编辑角色权限'"
          clearable
          label="用户角色"
          prop="roles"
          ><el-select
            multiple
            collapse-tags
            v-model="permissionInfoForm.permissions"
          >
            <el-option
              v-for="item in permissionOption"
              :key="item.id"
              :label="item.permissionName"
              :value="item.permissionName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <span>
        <el-button auto-insert-space @click="submitForm(editPermissionRef)"
          >确认</el-button
        >
        <el-button auto-insert-space @click="showEdit = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { PermissionInfoData } from "@/type/permissionManagement";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { createRole, updateUserRole } from "@/request/permissionManagement";
let permissionOption = ref();

const data = new PermissionInfoData();
let permissionInfoForm = reactive(data.permissionInfo);
let showEdit = ref<boolean>(false);
let currTitle = ref("");
const handleAdd = () => {
  currTitle.value = "新增";
  showEdit.value = true;
};
const editPermissionRules = {
  permissionName: [
    { required: true, message: "请输入权限名称", trigger: "change" },
    { max: 15, min: 1, message: "权限名称应为1-15个字符", trigger: "blur" },
  ],
  permissions: [
    {
      required: true,
      message: "分配权限不能为空",
      trigger: ["blur", "change"],
      type: "array",
    },
  ],
};
const submitForm = (formEI: FormInstance | undefined) => {
  if (!formEI) return;

  formEI.validate((valid) => {
    if (!valid) return;
    if ("新增" == currTitle.value) {
      createRole(data.permissionInfo).then((res) => {
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
          emit("queryRoleInfo");
        }
      });
      return;
    }
    if ("编辑用户角色" == currTitle.value) {
      updateUserRole(data.roleInfo).then((res) => {
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
          emit("queryUserInfo");
        }
      });
      return;
    }
  });
};

const editPermissionRef = ref<FormInstance>();

const resetForm = () => {
  editPermissionRef.value.resetFields();
};
defineExpose({ handleAdd });
</script>

<style scoped></style>
