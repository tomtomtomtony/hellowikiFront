export interface CategoryFormInt {
  name: string;
  parentMenuId: number;
  parentName: string;
}

export class CategoryData {
  categoryForm: CategoryFormInt = {
    name: "",
    parentMenuId: 0,
    parentName: "",
  };
}
