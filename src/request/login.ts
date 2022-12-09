import type { LoginData } from "@/type/login";
import service from "@/request/index";

export function login(data: LoginData) {
  return service.noAuthorService({
    url: "api/v1/user/login",
    method: "post",
    data,
  });
}
