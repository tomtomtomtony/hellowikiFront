export interface userInfoInt {
  userName: string;
  role: string;
  id: number;
  createAt: number;
  updateAt: number;
}

export class UserInfoData {
  userInfo: userInfoInt = {
    userName: "",
    role: "",
    id: 0,
    createAt: 0,
    updateAt: 0,
  };
}
