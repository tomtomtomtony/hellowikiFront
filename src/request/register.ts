import service from "@/request/index";
import type { RegisterData } from "@/type/register";

export function register(data: RegisterData) {
  return service({
    url: "api/v1/user/register",
    method: "post",
    data,
  });
}
