import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/global.css";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ContextMenu);

app.mount("#app");
