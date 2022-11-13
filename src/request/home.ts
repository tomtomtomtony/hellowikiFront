import service from "@/request/index";

export function getTopCategory() {
  return service({
    url: "/api/v1/menu/alltop",
    method: "get",
  })
}
