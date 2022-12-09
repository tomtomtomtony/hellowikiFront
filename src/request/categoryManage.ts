import service from "@/request/index";
import type { CategoryFormInt } from "@/type/categoryManage";

//新建分类
export function createCategory(data: CategoryFormInt) {
  return service.authorService({
    url: "api/v1/category/create",
    method: "post",
    data,
  });
}


//删除分类
export function deleteCategory(data: CategoryFormInt) {
  return service.authorService({
    url: "api/v1/category/del",
    method: "post",
    data,
  });
}
