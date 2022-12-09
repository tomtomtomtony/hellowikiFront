import service from "@/request/index";
import type { RegisterData } from "@/type/register";

export function register(data: RegisterData) {
  return service.noAuthorService({
    url: "api/v1/user/register",
    method: "post",
    data,
  });
}
