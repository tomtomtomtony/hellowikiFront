import service from "@/request/index";
import type { ArticleFormInt } from "@/type/articleManage";

export function getArticleDetail(data: ArticleFormInt) {
  return service.authorService({
    url: "api/v1/article/getArticle",
    method: "post",
    data,
  });
}

export function createArticle(data: ArticleFormInt) {
  return service.authorService({
    url: "api/v1/article/create",
    method: "post",
    data,
  });
}

export function updateArticle(data: ArticleFormInt) {
  return service.authorService({
    url: "api/v1/article/update",
    method: "post",
    data,
  });
}


export function deleteArticle(data: ArticleFormInt) {
  return service.authorService({
    url: "api/v1/article/del",
    method: "post",
    data,
  });
}
