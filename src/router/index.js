import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/Home.vue";
import MenuView from "../views/MenuView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/menu", component: MenuView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
