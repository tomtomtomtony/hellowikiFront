<template>
  <!--文章Markdown正文-->
  <el-card>
    <template #header>
      <div class="card-header">
        <span v-html="articleHtml.title "></span>
        <el-button class="button" text auto-insert-space>关闭</el-button>
      </div>
    </template>
    <div v-html="articleHtml.content"></div>
    <el-button auto-insert-space @click="toEdit">编辑</el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import MarkdownIt from "markdown-it";
import { getArticleDetail } from "@/request/articleManage";
import { ArticleData } from "@/type/articleManage";
import { useRoute, useRouter } from "vue-router";
import hljs from "markdown-it-highlightjs";
import latex from "markdown-it-katex";
import { setItemLocalStorage } from "@/stores/storage";
const route = useRoute();
let data = new ArticleData().articleForm;
let articleHtml = reactive({
  title: "",
  content: "",
});
let articleJson = new ArticleData().articleForm;

//监视路由参数变化
watchEffect(() => {
  articleHtml.value = "";
  data.articleTitle = route.query.articleTitle;
  data.categoryMenuId = Number(route.query.categoryMenuId);
  data.categoryName = route.query.categoryName;
  //为编辑作准备
  articleJson.categoryMenuId = data.categoryMenuId;
  articleJson.categoryName = data.categoryName;
  getArticleDetail(data).then((res) => {
    if (Array.isArray(res.data)) {
      let jsonObject = JSON.parse(res.data[0]);
      articleJson = jsonObject; //为编辑作准备
      articleJson.categoryMenuId = data.categoryMenuId;
      articleJson.categoryName = data.categoryName;
      let md = new MarkdownIt();
      md.use(hljs).use(latex);
      articleHtml.content = md.render(jsonObject.content);
      articleHtml.title = md.render(jsonObject.title);
    }
  });
});
onMounted(() => {
  queryArticle();
});
const queryArticle = () => {
  articleHtml.value = "";
  data.articleTitle = route.query.articleTitle;
  data.categoryMenuId = Number(route.query.categoryMenuId);
  data.categoryName = route.query.categoryName;
  //为编辑作准备
  articleJson.categoryMenuId = data.categoryMenuId;
  articleJson.categoryName = data.categoryName;
  getArticleDetail(data).then((res) => {
    if (Array.isArray(res.data)) {
      let jsonObject = JSON.parse(res.data[0]);
      articleJson = jsonObject; //为编辑作准备
      articleJson.categoryMenuId = data.categoryMenuId;
      articleJson.categoryName = data.categoryName;
      let md = new MarkdownIt();
      md.use(hljs).use(latex);
      articleHtml.content = md.render(jsonObject.content);
    }
  });
};

const router = useRouter();
const toEdit = () => {
  setItemLocalStorage("articleJsonStr", articleJson);
  router.push({
    path: "/article/createEdit",
    query: {
      aimTo: "edit",
    },
  });
};

defineExpose({ queryArticle });
</script>

<style scoped></style>
