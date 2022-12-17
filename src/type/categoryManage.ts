export interface CategoryFormInt {
  name: string;
  parentName: string;
  path: string;
  parentPath: string;
}

export class CategoryData {
  categoryForm: CategoryFormInt = {
    name: "",
    parentName: "",
    path: "",
    parentPath:"",
  };
}
