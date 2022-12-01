export interface ArticleFormInt {
  articleTitle: string;
  categoryName: string;
  categoryMenuId: number;
}

export class ArticleData {
  articleForm: ArticleFormInt = {
    articleTitle: "",
    categoryName: "",
    categoryMenuId: 0,
  };
}
