import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("@/views/user/login.vue");
const Register = () => import("@/views/user/register.vue");
const GetArticle = () => import("@/views/article/articleDetail.vue");
const CreateEditArticle = () => import("@/views/article/component/addEdit.vue");
const PermissionManagement=()=>import("@/views/user/permissionManagement.vue");
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
      path: "/article",
      children: [
        {
          path: "/article/createEdit",
          name: "CreateArticle",
          component: CreateEditArticle,
        },
        {
          path: "/article/getArticle",
          component: GetArticle,
        }
      ],
    },
    {
      path: "/permission",
      name: "Permission",
      component: PermissionManagement,
    },
  ],
});

export default router;
