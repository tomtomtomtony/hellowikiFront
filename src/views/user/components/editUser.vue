<template>
  <el-dialog v-model="showEdit" :title="currTitle" draggable @close="resetForm">
    <el-card>
      <el-form ref="editUserRef" :model="userInfoForm" :rules="editUserRules">
        <el-form-item
          v-show="currTitle === '编辑用户名'"
          clearable
          label="新用户名"
          prop="userName"
          type="text"
        >
          <el-input v-model="userInfoForm.userName"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <template #footer>
      <span>
        <el-button auto-insert-space @click="submitForm(editUserRef)"
          >确认</el-button
        >
        <el-button auto-insert-space @click="showEdit = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { UserInfoData } from "@/type/permissionManagement";
import { editUserName} from "@/request/permissionManagement";
let showEdit = ref<boolean>(false);
let currTitle = ref("");
const userData = new UserInfoData();
let userInfoForm = reactive(userData.userInfo);
const handleEdit = (id: number) => {
  currTitle.value = "编辑用户名";
  userInfoForm.id = id;
  showEdit.value = true;
};

let emit = defineEmits(["queryUserInfo"]);
const submitForm = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    if ("编辑用户名" == currTitle.value) {
      editUserName(userData.userInfo).then((res) => {
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
const editUserRules = {
  userName: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { max: 15, min: 6, message: "用户名应为6-15个字符", trigger: "blur" },
  ],
};
const editUserRef = ref<FormInstance>();

const resetForm = () => {
  editUserRef.value.resetFields();
};
defineExpose({ handleEdit });
</script>

<style scoped></style>
