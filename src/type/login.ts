export interface LoginFormInt {
    userName: string;
  password: string;
}

export class LoginData {
    loginForm: LoginFormInt = {
    userName: "",
        password: ""
    };
}
