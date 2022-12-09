export interface ArticleFormInt {
  articleTitle: string;
  categoryName: string;
  categoryMenuId: number;
  articleContent: string;
  keywords: string[];
  author: string;
  articleId: number;
}

export class ArticleData {
  articleForm: ArticleFormInt = {
    articleTitle: "",
    categoryName: "",
    categoryMenuId: 0,
    articleContent: "",
    keywords: [],
    author: "",
    articleId: 0,
  };
}
