<script setup>
import { ref, inject } from "vue";


// const authData = reactive({
//   login: "123",
//   password: "321",
// });

const isAuth = inject("isAuth");
const authData = inject("authData");
const checkAuth = inject("checkAuth");

const handleSubmit = () => {
  checkAuth(authData);

  //   if (isAuth.value) router.push("/");
  // После успешного входа можно сделать редирект
  // если нужно, используйте useRouter()
};
</script>

<template>
  <div class="login">
    <div class="login__block">
      <div class="login__title">Вход в личный кабинет</div>
      <form @submit.prevent="handleSubmit" action="" class="login__form form">
        <div class="form__group">
          <label for="" class="form__label">Логин</label>
          <input type="text" class="form__input" v-model="authData.login" />
        </div>

        <div class="form__group">
          <label for="" class="form__label">Пароль</label>
          <input type="text" class="form__input" v-model="authData.password" />
        </div>

        <button class="form__btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  font-family: sans-serif;
  max-width: 75%;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  &__title {
    font-size: 32px;
    font-weight: 700;
    color: white;
  }

  &__block {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.form {
  width: 100%;
  text-align: left;
  &__group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__label {
    margin-left: 10px;
    font-size: 12px;
    color: white;
    font-weight: 700;
  }

  &__input {
    padding-left: 15px;
    width: 100%;
    height: 40px;
    border: none;
    background-color: none;
    border-radius: 10px;
  }
}
</style>
