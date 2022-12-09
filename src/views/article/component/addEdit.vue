<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <el-button class="button" text auto-insert-space>关闭</el-button>
      </div>
    </template>
    <div>
      <el-form ref="createArticleFormRef" :model="articleForm" label-width="7%">
        <el-form-item label="标题">
          <el-input
            :disabled="disEditabel"
            placeholder="请输入标题"
            v-model="articleForm.articleTitle"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input
            placeholder="请输入关键词"
            v-model="articleForm.keywords"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10 }"
            v-model="articleForm.articleContent"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button auto-insert-space @click="confirmAdd(createArticleFormRef)"
            >确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ArticleData } from "@/type/articleManage";
import type { FormInstance } from "element-plus";
import { createArticle, updateArticle } from "@/request/articleManage";
import { useRoute, useRouter } from "vue-router";
import { getItemlLocalStorage, removeItemLocalStorage } from "@/stores/storage";

onMounted(() => {
  resetForm();
  handleAddEdit();
});
const router = useRouter();
const route = useRoute();
let title = ref<string>("");
let data = new ArticleData();
let articleForm = reactive(data.articleForm);
const createArticleFormRef = ref<FormInstance>();
let disEditabel=ref(false)
const handleAddEdit = () => {
  if ("aimTo" in route.query && route.query.aimTo === "create") {
    title.value = "新增";
    articleForm.categoryMenuId = Number(route.query.categoryMenuId);
    articleForm.categoryName = route.query.categoryName;
    articleForm.author = getItemlLocalStorage("userAndToken")?.userName;
  } else if ("aimTo" in route.query && route.query.aimTo === "edit") {
    title.value = "编辑";
    disEditabel.value = true;
    articleForm.categoryMenuId = getItemlLocalStorage("articleJsonStr")?.categoryMenuId;
    articleForm.categoryName = getItemlLocalStorage("articleJsonStr")?.categoryName;
    articleForm.author = getItemlLocalStorage("userAndToken")?.userName;
    articleForm.articleTitle = getItemlLocalStorage("articleJsonStr")?.title;
    articleForm.articleContent = getItemlLocalStorage("articleJsonStr")?.content;
    articleForm.keywords = getItemlLocalStorage("articleJsonStr")?.keywords;
    removeItemLocalStorage("articleJsonStr");
  }

};
const confirmAdd = (formEI: FormInstance | undefined) => {
  if (!formEI) return;
  formEI.validate((valid) => {
    if (!valid) return;
    if (title.value === '新增'){
      createArticle(data.articleForm).then((res) => {
        if (res.status != 200) {
          ElMessage({
            message: res.message,
            type: "error",
          });
        } else {
          router.go(0);
          ElMessage({
            message: res.message,
            type: "success",
          });
        }
      });
    }else if (title.value==='编辑'){
      updateArticle(data.articleForm).then((res) => {
        if (res.status != 200) {
          ElMessage({
            message: res.message,
            type: "error",
          });
        } else {
          router.go(0);
          ElMessage({
            message: res.message,
            type: "success",
          });
        }
      });
    }
  });
};


const resetForm = () => {
  articleForm.articleTitle = "";
  articleForm.keywords = [];
  articleForm.articleContent = "";
};
defineExpose({ });
</script>

<style scoped></style>
