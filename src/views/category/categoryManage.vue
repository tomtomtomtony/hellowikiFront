<template>
  <el-dialog
    v-model="showCategoryManage"
    :title="title"
    width="40%"
    @close="resetForm"
  >
    <el-form
      ref="categoryManageFormRef"
      :model="categoreForm"
      :rules="categoryRules"
      label-width="0"
    >
      <el-form-item prop="name">
        <el-input
          v-model="categoreForm.name"
          clearable
          maxlength="30"
          minlength="1"
          placeholder="请输入新分类的名称"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item v-show="false" prop="parentName">
        <el-input v-model="categoreForm.parentName" />
      </el-form-item>
      <el-form-item v-show="false" prop="parentMenuId">
        <el-input v-model="categoreForm.parentMenuId" />
      </el-form-item>
      <el-form-item>
        <el-button auto-insert-space @click="resetForm()">取消</el-button>
        <el-button auto-insert-space @click="confirmAdd(categoryManageFormRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, toRef } from "vue";
import { createCategory } from "@/request/categoryManage";
import type { FormInstance } from "element-plus";
import { CategoryData } from "@/type/categoryManage";

const categoryRules = {
  name: [
    { required: true, message: "请输入新分类名称", trigger: "change" },
    { max: 30, min: 1, message: "用户名应为1-30个字符", trigger: "change" },
  ],
  parentName: [],
  parentId: [],
};

let showCategoryManage = ref<boolean>(false);
let title = ref<string>();
const handleAdd = (currNodeInfo: object) => {
  window.console.log(currNodeInfo);
  title.value = "新增分类-新分类的上级分类为:" + currNodeInfo.parentName;
  //处理顶级分类
  if (currNodeInfo.parentMenuId == 0) {
    data.categoryForm.parentMenuId = currNodeInfo.id;
  } else {
    data.categoryForm.parentMenuId = currNodeInfo.parentMenuId;
  }
  data.categoryForm.parentName = currNodeInfo.parentName;
  showCategoryManage.value = true;
};

let data = new CategoryData();
let categoreForm = reactive(data.categoryForm);
const categoryManageFormRef = ref<FormInstance>();
//const data = reactive(new CategoryData())
const confirmAdd = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    createCategory(data.categoryForm).then((res) => {
      window.console.log(data.categoryForm);
      showCategoryManage.value = false;
      if (res.code != 200) {
        ElMessage({
          message: res.message,
          type: "error",
        });
        return;
      }
      ElMessage({
        message: res.message,
        type: "success",
      });
    });
  });
};
const resetForm = () => {
  data.categoryForm.name = "";
  data.categoryForm.parentName = "";
  data.categoryForm.parentMenuId = 0;
};

defineExpose({ handleAdd });
</script>

<style scoped></style>
