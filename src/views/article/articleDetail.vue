<template>
  <!--文章Markdown正文-->
  <div v-html="articleContent"></div>
  <span></span>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import MarkdownIt from "markdown-it";
import { getArticleDetail } from "@/request/articleManage";
import { ArticleData } from "@/type/articleManage";
import { useRoute } from "vue-router";

const route = useRoute();
let data = new ArticleData().articleForm;
let articleContent = ref("");
//监视路由参数变化
watchEffect(() => {
  articleContent.value = "";
  data.articleTitle = route.query.articleTitle;
  data.categoryMenuId =Number(route.query.categoryMenuId);
  data.categoryName = route.query.categoryName;
  getArticleDetail(data).then((res) => {
    window.console.log(res);
    if (Array.isArray(res.data)) {
      let markdown = res.data[0].content;
      let md = new MarkdownIt();
      articleContent.value = md.render(markdown);
    }
  });
});
onMounted(() => {
  queryArticle();
});
const queryArticle = () => {
  articleContent.value = "";
  window.console.log(route.query);
  data.articleTitle = route.query.articleTitle;
  data.categoryMenuId = Number(route.query.categoryMenuId);
  data.categoryName = route.query.categoryName;
  getArticleDetail(data).then((res) => {
    if (Array.isArray(res.data)) {
      let markdown = res.data[0].content;
      let md = new MarkdownIt();
      articleContent.value = md.render(markdown);
    }
  });
};
defineExpose({ queryArticle });
</script>

<style scoped></style>
