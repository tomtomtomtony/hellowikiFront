export interface ArticleFormInt {
  articleTitle: string;
  categoryName: string;
  articleContent: string;
  parentPath: string;
  path: string;
  keywords: string[];
  author: string;
  pageSize: number;
  pageNum: number;
}

export class ArticleData {
  articleForm: ArticleFormInt = {
    articleTitle: "",
    categoryName: "",
    articleContent: "",
    parentPath: "",
    path: "",
    keywords: [],
    author: "",
    pageNum: 1,
    pageSize: 10,
  };
}
