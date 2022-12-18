import service from "@/request/index";
import type { permissionInfoInt, roleInfoInt, userInfoInt } from "@/type/permissionManagement";
import { RegisterData } from "@/type/register";

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

//查询权限信息
export function getAllPermission(data: permissionInfoInt) {
  return service.authorService({
    url: `api/v1/permission/all?`+'pageNum='+data.pageNum+'&pageSize='+data.pageSize,
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

export function updateUserRole(data: roleInfoInt) {
  return service.authorService({
    url: `api/v1/role/updateUserRole/` + data.id,
    method: "put",
    data,
  });
}

export function createRole(data: roleInfoInt) {
  return service.authorService({
    url: "api/v1/role/create",
    method: "post",
    data,
  });
}


export function createPermission(data: permissionInfoInt) {
  return service.authorService({
    url: "api/v1/permission/create",
    method: "post",
    data,
  });
}
