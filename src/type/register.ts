export interface RegisterFormInt {
  userName: string;
  password: string;
  confirmPwd: string;
}

export class RegisterData {
  registerForm: RegisterFormInt = {
    userName: "",
    password: "",
    confirmPwd: "",
  };
}
