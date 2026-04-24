import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/Home.vue";
import MenuView from "../views/MenuView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/menu", component: MenuView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("isAuth") === "true";

  // Если пользователь не авторизован и пытается перейти не на логин
  if (!isAuth && to.path !== "/login") {
    // Перенаправляем на логин
    next("/login");
  }
  // Если пользователь авторизован и пытается перейти на логин
  else if (isAuth && to.path === "/login") {
    // Перенаправляем на главную
    next("/");
  } else {
    next(); // разрешаем переход
  }
});
