import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/assets/global.css";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import "element-plus/theme-chalk/src/message.scss";
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);
app.use(ContextMenu);
app.mount("#app");
