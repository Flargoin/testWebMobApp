<script setup>
import { ref, provide, reactive, onBeforeMount } from "vue";
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";
import UpdateNotification from "./components/UpdateNotification.vue";
import { useRouter } from "vue-router";
import { BiometricAuth } from "capacitor-biometric-authentication";

const router = useRouter();

const authData = reactive({
  login: "",
  password: "",
});

const isAuth = ref(false);
const isBiometricVerified = ref(false); // Флаг для отслеживания биометрической проверки

// Функция биометрической аутентификации
async function authenticateUser() {
  try {
    // Проверяем, доступна ли биометрия на устройстве
    const { isAvailable } = await BiometricAuth.isAvailable();

    if (!isAvailable) {
      console.log("Биометрия не доступна");
      // Если биометрия недоступна, всё равно пускаем? (зависит от требований)
      return true; // или false, если биометрия обязательна
    }

    // Запрашиваем аутентификацию
    const result = await BiometricAuth.authenticate({
      reason: "Для дополнительной безопасности подтвердите личность",
      fallbackButtonTitle: "Использовать PIN-код",
      cancelButtonTitle: "Отмена",
    });

    if (result.isAuthenticated) {
      console.log("✅ Биометрическое подтверждение пройдено!");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Ошибка аутентификации", error);
    return false;
  }
}

// Сохраняем состояние авторизации
const setIsAuth = (value) => {
  isAuth.value = value;
  window.localStorage.setItem("isAuth", JSON.stringify(value));
};

// Загружаем состояние авторизации при старте
const loadAuthState = () => {
  const savedAuth = window.localStorage.getItem("isAuth");
  if (savedAuth !== null) {
    isAuth.value = JSON.parse(savedAuth);
  }
};

// Проверка логина/пароля с последующей биометрией
const checkAuth = async (data) => {
  // Шаг 1: Проверяем логин и пароль
  if (data.login === "login" && data.password === "password") {
    console.log("✅ Логин и пароль верны!");

    // Шаг 2: Запрашиваем биометрию как дополнительное подтверждение
    const biometricSuccess = await authenticateUser();

    if (biometricSuccess) {
      console.log(
        "✅ Биометрическая проверка пройдена! Полный доступ разрешён.",
      );
      setIsAuth(true);
      router.push("/");
    } else {
      console.log("❌ Биометрическая проверка не пройдена!");
      alert("Требуется биометрическое подтверждение для входа в приложение");
      // Остаёмся на странице логина
    }
  } else {
    console.log("❌ Неверный логин или пароль!");
    alert("Неверный логин или пароль");
  }
};

// Функция для выхода из аккаунта
const logout = () => {
  setIsAuth(false);
  router.push("/login");
};

// Загружаем состояние авторизации при монтировании
onBeforeMount(() => {
  loadAuthState();
});

// Предоставляем методы и данные дочерним компонентам
provide("authData", authData);
provide("checkAuth", checkAuth);
provide("isAuth", isAuth);
provide("logout", logout);
</script>

<template>
  <div v-if="isAuth">
    <Header />
    <RouterView />
    <Menu />
  </div>
  <RouterView v-else />
  <UpdateNotification />
</template>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
}

body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: linear-gradient(360deg, #03a8ef 0%, #0371ef 100%);
}

button {
  border: none;
  background-color: unset;
  cursor: pointer;
}
</style>
  