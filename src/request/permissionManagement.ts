import service from "@/request/index";
import type { UserInfoData } from "@/type/permissionManagement";

export function getUserInfo() {
  return service.authorService({
    url: "api/v1/user/all",
    method: "get",
  });
}
