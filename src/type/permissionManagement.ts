export interface userInfoInt {
  userName: string;
  roles: string;
  id: number;
  createAt: number;
  updateAt: number;
}

export class UserInfoData {
  userInfo: userInfoInt = {
    userName: "",
    roles: "",
    id: 0,
    createAt: 0,
    updateAt: 0,
  };
}
