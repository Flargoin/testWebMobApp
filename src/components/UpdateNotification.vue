<script setup>
import { ref, onMounted } from "vue";
import { checkForUpdate, downloadAndApply } from "../live-update";

const visible = ref(false);
const downloading = ref(false);
const error = ref(false);
const updateInfo = ref(null);

onMounted(async () => {
  const update = await checkForUpdate();
  if (update) {
    updateInfo.value = update;
    visible.value = true;
  }
});

const handleUpdate = async () => {
  if (!updateInfo.value) return;
  downloading.value = true;
  error.value = false;
  try {
    await downloadAndApply(updateInfo.value.tag, updateInfo.value.downloadUrl);
  } catch {
    downloading.value = false;
    error.value = true;
  }
};

const handleDismiss = () => {
  visible.value = false;
};
</script>

<template>
  <Transition name="overlay">
    <div v-if="visible" class="update-overlay" @click.self="handleDismiss">
      <Transition name="modal" appear>
        <div class="update-modal">
          <div class="update-modal__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="#03a8ef"
              />
            </svg>
          </div>

          <div class="update-modal__title">Доступно обновление</div>
          <div class="update-modal__version">{{ updateInfo?.tag }}</div>

          <div v-if="error" class="update-modal__error">
            Ошибка загрузки. Попробуйте позже.
          </div>

          <div class="update-modal__actions">
            <button
              v-if="!downloading"
              class="update-modal__btn update-modal__btn--primary"
              @click="handleUpdate"
            >
              Обновить
            </button>
            <div v-else class="update-modal__loader">
              <div class="update-modal__spinner"></div>
              <span>Загрузка...</span>
            </div>

            <button
              v-if="!downloading"
              class="update-modal__btn update-modal__btn--secondary"
              @click="handleDismiss"
            >
              Позже
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.update-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.update-modal {
  background: #313131;
  border-radius: 24px;
  padding: 28px 24px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &__icon {
    margin: 0 auto 16px;
    width: 48px;
    height: 48px;
    background: rgba(3, 168, 239, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__version {
    color: rgba(255, 255, 255, 0.5);
    font-size: 13px;
    margin-bottom: 20px;
  }

  &__error {
    color: #ef4444;
    font-size: 13px;
    margin-bottom: 16px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__btn {
    padding: 12px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
    border: none;

    &:active {
      opacity: 0.7;
      transform: scale(0.97);
    }

    &--primary {
      background: linear-gradient(360deg, #03a8ef 0%, #0371ef 100%);
      color: white;
    }

    &--secondary {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: white;
    font-size: 14px;
    padding: 12px;
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: #03a8ef;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.modal-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
.modal-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
