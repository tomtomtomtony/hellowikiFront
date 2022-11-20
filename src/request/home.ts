import service from "@/request/index";
//获取顶级分类
export function getTopCategory() {
  return service({
    url: "/api/v1/menu/alltop",
    method: "get",
  });
}
//获取当前分类下的菜单
export function getAllMenuCurrentCategory(categoryId: number) {
  return service({
    url: `/api/v1/menu/currentall?categoryId=` + categoryId,
    method: "get",
    // params: categoryId,
  });
}


