import service from "@/request/index";
//获取顶级分类
export function getTopCategory() {
  return service.authorService({
    url: "/api/v1/category/getTop",
    method: "get",
  });
}
//获取当前分类下的菜单
export function getAllMenuCurrentCategory(path: string) {
  return service.authorService({
    url: `/api/v1/category/currentall?path=` + path,
    method: "get",
  });
}
