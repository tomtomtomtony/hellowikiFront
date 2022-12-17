import service from "@/request/index";
import type { roleInfoInt, userInfoInt } from "@/type/permissionManagement";

export function getUserInfo(data: userInfoInt) {
  return service.authorService({
    url: `api/v1/user/all?`+'pageNum='+data.pageNum+'&pageSize='+data.pageSize,
    method: "get",
  });
}

export function getUserRoles(userId: number) {
  return service.authorService({
    url: `api/v1/role/getRoles?id=` + userId,
    method: "get",
  });
}
//查询角色信息
export function getAllRoles(data: roleInfoInt) {
  return service.authorService({
    url: `api/v1/role/all?`+'pageNum='+data.pageNum+'&pageSize='+data.pageSize,
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
