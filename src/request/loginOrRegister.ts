import type { LoginData } from "@/type/loginOrRegister";
import service from ".";

export function login(data: LoginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}
