<script setup>
import { ref, reactive } from "vue";

let path = ref("Главная1");
let header = reactive({
  canDrop: false,
  isDrop: false,
  deep: false,
});

const toggleDropHeader = () => (header.isDrop = !header.isDrop);
</script>

<template>
  <div class="header" :class="header.isDrop ? 'header--dropped' : ''">
    <div v-if="header.deep" class="header__back">
      <button class="button button--back">
        <span></span>
      </button>
    </div>

    <div class="header__container">
      <div class="header__title">{{ path }}</div>

      <div class="header__triggers">
        <button
          v-if="header.canDrop"
          @click="toggleDropHeader"
          class="button button--drop"
          :class="header.isDrop ? 'button--dropped' : ''"
        >
          <span></span>
        </button>
        <button class="button button--burger">
          <span></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  max-height: 77px;
  overflow: hidden;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #212125;
    border-radius: 0 0 24px 24px;
    color: white;
    height: 100%;
    padding: 15px;
  }

  &__triggers {
    display: flex;
    // align-items: center;
    gap: 10px;
  }

  &--dropped {
    overflow: visible;
    max-height: 200px;
    .header__container {
      align-items: baseline;
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  backdrop-filter: blur(35.3px);
  border: 1px solid white;
  transition:
    border 0.3s ease-in-out,
    background-color 0.3s ease-in-out,
    transform 0.3s ease-in-out;

  span {
    transition: background-color 0.3s ease-in-out;

    &::after,
    &::before {
      transition: border 0.3s ease-in-out;
    }
  }

  &:active {
    opacity: 0.5;
    transform: scale(0.95);
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      border-color: #03a8ef;

      span {
        background-color: #03a8ef;

        &::before,
        &::after {
          border-color: #03a8ef;
        }
      }
    }
  }
  &--burger {
    border: none;
    background-color: #03a8ef;

    span {
      position: relative;
      display: block;
      width: 16px;
      height: 2px;
      background-color: white;

      &::before,
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 16px;
        height: 2px;
        background-color: white;
      }

      &::before {
        top: -5px;
      }

      &::after {
        top: 5px;
      }
    }
  }

  &--back,
  &--drop {
    span {
      position: relative;
      display: block;
      width: 16px;
      height: 2px;
      background-color: white;

      &::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 50%;
        width: 6px;
        height: 6px;
        border-top: 2px solid white;
        border-left: 2px solid white;
        transform: rotate(-45deg) translateY(-70%);
      }
    }
  }

  &--drop {
    transform: rotate(-90deg);

    &:active {
      opacity: 0.5;
      transform: scale(0.95) rotate(-90deg);
    }
  }

  &--dropped {
    transform: rotate(-270deg);
    overflow: visible;
  }
}
</style>
