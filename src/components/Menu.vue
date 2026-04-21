<script setup>
import { ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
</script>

<template>
  <div class="menu">
    <RouterLink
      to="/"
      class="menu__item"
      data-menu="main"
      active-class="menu__item--active"
    >
      <div class="menu__item-ico">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 16.2339C11.2051 16.2339 9.75 17.689 9.75 19.4839V25.9839H16.25V19.4839C16.25 17.689 14.7949 16.2339 13 16.2339Z"
            fill="white"
          />
          <path
            d="M18.4167 19.4838V25.9838H22.75C24.5449 25.9838 26 24.5287 26 22.7338V12.8527C26.0003 12.2899 25.7815 11.7491 25.3901 11.3447L16.1839 1.39213C14.5595 -0.365412 11.818 -0.473322 10.0604 1.15107C9.97694 1.22826 9.8965 1.30864 9.81937 1.39213L0.629434 11.3415C0.226129 11.7475 -0.000152267 12.2967 7.68741e-08 12.869V22.7338C7.68741e-08 24.5287 1.45509 25.9838 3.25 25.9838H7.58332V19.4838C7.60358 16.5298 9.98862 14.1175 12.8683 14.048C15.8443 13.9762 18.394 16.4296 18.4167 19.4838Z"
            fill="white"
          />
          <path
            d="M13 16.2339C11.2051 16.2339 9.75 17.689 9.75 19.4839V25.9839H16.25V19.4839C16.25 17.689 14.7949 16.2339 13 16.2339Z"
            fill="white"
          />
        </svg>
      </div>
      <div class="menu__item-name">Главная</div>
    </RouterLink>

    <RouterLink
      to="/menu"
      class="menu__item"
      data-menu="menu"
      active-class="menu__item--active"
    >
      <div class="menu__item-name">Меню</div>
      <div class="menu__item-ico">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="15" width="11" height="11" rx="4" fill="white" />
          <rect x="15" y="15" width="11" height="11" rx="4" fill="white" />
          <rect width="11" height="11" rx="4" fill="white" />
          <rect x="15" width="11" height="11" rx="4" fill="white" />
        </svg>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: 2px;
  position: fixed;
  z-index: 1;
  bottom: 11px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 340px;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 60px;
  height: 100%;
  z-index: 100;

  &__item {
    padding: 15px;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-radius: 40px;

    &-ico {
      display: flex;
      align-items: center;
    }

    &-name {
      font-size: 0;
      transition: font-size 0.3s ease-in-out;
      color: white;
      white-space: nowrap;
    }

    // Автоматический активный класс от Vue Router
    &--active {
      width: 100%;
      gap: 20px;
      background: linear-gradient(360deg, #03a8ef 0%, #0371ef 100%);

      .menu__item-name {
        font-size: 18px;
        color: white;
      }
    }
  }

  // Разные радиусы для первого и последнего элемента
  .menu__item:first-child {
    border-radius: 40px 0 0 40px;

    &.menu__item--active {
      border-radius: 40px 0 0 40px;
    }
  }

  .menu__item:last-child {
    border-radius: 0 40px 40px 0;

    &.menu__item--active {
      border-radius: 0 40px 40px 0;
    }
  }
}
</style>
