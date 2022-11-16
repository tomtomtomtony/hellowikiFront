import type { LoginData } from "@/type/login";
import service from ".";

export function login(data: LoginData) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}
