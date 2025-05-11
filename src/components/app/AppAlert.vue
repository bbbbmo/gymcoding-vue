<script setup lang="ts">
/**
 * @description 알림 컴포넌트
 * @param {string} message - 알림 메시지
 * @param {AlertType} type - 알림 타입
 */
export type AlertType = 'success' | 'error'

withDefaults(
  defineProps<{
    items: {
      message: string
      type: AlertType
    }[]
  }>(),
  {
    items: () => [],
  },
)

const typeStyle = (type: AlertType) => {
  return type === 'error' ? 'alert-danger' : 'alert-primary'
}
</script>

<template>
  <TransitionGroup name="slide">
    <div
      v-for="({ message, type }, index) in items"
      :key="index"
      class="alert app-alert"
      :class="typeStyle(type)"
      role="alert"
    >
      {{ message }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
