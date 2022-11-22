import { createRouter, createWebHistory } from "vue-router";

const LoginOrRegister = () => import("@/views/loginOrRegister.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/loginOrRegister", component: LoginOrRegister },
  ],
});

export default router;
