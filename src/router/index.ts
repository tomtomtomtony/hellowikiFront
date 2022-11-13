import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("@/views/Login.vue");
const Home = () => import("@/views/Home.vue");
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: Login },
    { path: "/home", component: Home },
  ],
});

export default router;
