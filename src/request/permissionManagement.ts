import service from "@/request/index";
import type { userInfoInt } from "@/type/permissionManagement";

export function getUserInfo() {
  return service.authorService({
    url: "api/v1/user/all",
    method: "get",
  });
}

export function getUserRoles(userId: number) {
  return service.authorService({
    url: `api/v1/user/getRoles?id=` + userId,
    method: "get",
  });
}

export function editUserName(data: userInfoInt) {
  return service.authorService({
    url: `api/v1/user/editName/` + data.id,
    method: "put",
    data,
  });
}
