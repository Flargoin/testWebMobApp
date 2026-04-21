import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router/index";
import { notifyAppReady } from "./live-update";

createApp(App).use(router).mount("#app");

notifyAppReady();
