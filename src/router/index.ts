import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("@/views/user/login.vue");
const Register = () => import("@/views/user/register.vue");
const GetArticle = () => import("@/views/article/articleDetail.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/article/getArticle",
      name: "GetArticle",
      component: GetArticle,
    },
  ],
});

export default router;
