import service from "@/request/index";
import type { CategoryFormInt } from "@/type/categoryManage";

export function createCategory(data: CategoryFormInt) {
  return service({
    url: 'api/v1/category/create',
    method: "post",
    data,
  });
}
