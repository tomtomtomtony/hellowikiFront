import service from "@/request/index";
import type { ArticleFormInt } from "@/type/articleManage";

export function getArticleDetail(data: ArticleFormInt) {
  return service({
    url: "api/v1/article/getArticle",
    method: "post",
    data,
  });
}
