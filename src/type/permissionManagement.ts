export interface userInfoInt {
  userName: string;
  roles: string;
  id: number;
  createAt: number;
  updateAt: number;
  pageSize: number;
  pageNum: number;
}

export class UserInfoData {
  userInfo: userInfoInt = {
    userName: "",
    roles: "",
    id: 0,
    createAt: 0,
    updateAt: 0,
    pageSize: 10,
    pageNum: 1,
  };
}

export interface roleInfoInt {
  roleName: string;
  roles: [];
  id: number;
  createAt: number;
  updateAt: number;
  pageSize: number;
  pageNum: number;
}

export class RoleInfoData {
  roleInfo: roleInfoInt = {
    roleName: "",
    id: 0,
    roles: [],
    createAt: 0,
    updateAt: 0,
    pageSize: 10,
    pageNum: 1,
  };
}


export interface permissionInfoInt {
  permissionName: string;
  permissions: [];
  id: number;
  createAt: number;
  updateAt: number;
  pageSize: number;
  pageNum: number;
}

export class PermissionInfoData {
  permissionInfo: permissionInfoInt = {
    permissionName: "",
    id: 0,
    permissions: [],
    createAt: 0,
    updateAt: 0,
    pageSize: 10,
    pageNum: 1,
  };
}
