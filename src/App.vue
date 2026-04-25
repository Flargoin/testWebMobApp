<script setup>
import { ref, provide, reactive, onBeforeMount, onMounted } from "vue";
import Header from "./components/Header.vue";
import Menu from "./components/Menu.vue";
import UpdateNotification from "./components/UpdateNotification.vue";
import { useRouter } from "vue-router";
// Правильный импорт для вашего плагина
import { BiometricAuth } from "@aparajita/capacitor-biometric-auth";

const router = useRouter();

const authData = reactive({ login: "", password: "" });
const isAuth = ref(false);
const isBiometricAvailable = ref(false);

// --- Функция проверки доступности (по документации) ---
async function checkBiometryAvailability() {
  try {
    // Используем checkBiometry, а не isAvailable
    const result = await BiometricAuth.checkBiometry();
    isBiometricAvailable.value = result.isAvailable;

    if (result.isAvailable) {
      console.log("✅ Биометрия готова:", result.biometryType);
    } else {
      console.log("❌ Биометрия не готова, причина:", result.reason);
    }
    return result.isAvailable;
  } catch (error) {
    console.error("Ошибка проверки", error);
    isBiometricAvailable.value = false;
    return false;
  }
}

// --- Функция аутентификации (без .isAuthenticated) ---
async function authenticateUser() {
  try {
    // 1. Проверяем доступность
    const isAvailable = await checkBiometryAvailability();
    if (!isAvailable) {
      console.log("Биометрия не поддерживается, вход по логину/паролю");
      return true; // Пропускаем, если биометрия не обязательна
    }

    // 2. Запрашиваем аутентификацию. Promise выполнится при УСПЕХЕ.
    await BiometricAuth.authenticate({
      reason: "Подтвердите личность для входа",
      cancelTitle: "Отмена",
      allowDeviceCredential: true, // Разрешить PIN/пароль как запасной вариант
      androidTitle: "Вход в приложение",
      androidSubtitle: "Требуется подтверждение",
      androidDescription: "Приложите палец к датчику или используйте PIN",
    });

    // Если мы здесь — значит успех!
    console.log("✅ Биометрия пройдена!");
    return true;
  } catch (error) {
    // Обработка ошибок: error.code содержит тип ошибки
    if (error.code === "userCancel") {
      console.log("Пользователь отменил");
    } else if (error.code === "authenticationFailed") {
      console.log("❌ Отпечаток не распознан");
    } else {
      console.error("Ошибка:", error.message);
    }
    return false;
  }
}

// --- Логин с проверкой ---
const checkAuth = async (data) => {
  if (data.login === "login" && data.password === "password") {
    const biometricSuccess = await authenticateUser();
    if (biometricSuccess) {
      setIsAuth(true);
      router.push("/");
    } else {
      alert("Требуется биометрическое подтверждение");
    }
  } else {
    alert("Неверный логин или пароль");
  }
};

const setIsAuth = (value) => {
  isAuth.value = value;
  window.localStorage.setItem("isAuth", JSON.stringify(value));
};

const loadAuthState = () => {
  const saved = window.localStorage.getItem("isAuth");
  if (saved) isAuth.value = JSON.parse(saved);
};

const logout = () => {
  setIsAuth(false);
  router.push("/login");
};

// --- Жизненный цикл ---
onBeforeMount(() => loadAuthState());

onMounted(async () => {
  await checkBiometryAvailability();
  // Слушаем изменения биометрии (например, если пользователь добавил палец)
  try {
    const listener = await BiometricAuth.addResumeListener((result) => {
      isBiometricAvailable.value = result.isAvailable;
    });
    // В реальном приложении listener нужно удалять при unmount компонента
  } catch (e) {
    console.error(e);
  }
});

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
