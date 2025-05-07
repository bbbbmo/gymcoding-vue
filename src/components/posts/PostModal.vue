<script setup lang="ts">
import AppModal from '@/components/app/AppModal.vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  content: string
  createdAt: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// computed는 읽기 전용이지만 get, set으로 쓰기도 가능
const show = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const closeModal = () => {
  show.value = false
}
</script>

<template>
  <Transition name="modal">
    <AppModal v-model="show" title="게시글">
      <template #default>
        <div class="row g-3">
          <div class="col-3 text-muted">제목</div>
          <div class="col-9">{{ title }}</div>
          <div class="col-3 text-muted">내용</div>
          <div class="col-9">{{ content }}</div>
          <div class="col-3 text-muted">등록일</div>
          <div class="col-9">{{ $dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
        </div>
      </template>
      <template #actions>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
          닫기
        </button>
      </template>
    </AppModal>
  </Transition>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>
