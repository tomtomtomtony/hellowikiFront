import service from "@/request/index";

export function getTopCategory() {
  return service({
    url: "/api/v1/menu/alltop",
    method: "get",
  });
}

export function getAllMenuCurrentCategory(categoryId: number) {
  return service({
    url: `/api/v1/menu/currentall?categoryId=` + categoryId,
    method: "get",
    // params: categoryId,
  });
}
