import { createApp } from "vue";
import { CapacitorUpdater } from "@capgo/capacitor-updater";
import App from "./App.vue";
import { router } from "./router/index"; // если вынесете роутер в отдельный файл
createApp(App).use(router).mount("#app");
CapacitorUpdater.notifyAppReady();
