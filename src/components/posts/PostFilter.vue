<script setup lang="ts">
/**
 * @description 게시글 필터 컴포넌트
 */
defineProps<{
  title: string
  limit: number
}>()

const emit = defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'update:limit', value: number): void
}>()

const changeTitle = (e: Event) => {
  const input = e.target as HTMLInputElement
  setTimeout(() => {
    emit('update:title', input.value)
    console.log(input.value)
  }, 500)
}
</script>

<template>
  <form @submit.prevent>
    <div class="row g-3">
      <div class="col">
        <input
          type="text"
          class="form-control"
          placeholder="제목으로 검색해주세요."
          @input="changeTitle"
          :value="title"
        />
      </div>
      <div class="col-3">
        <select
          class="form-select"
          @input="$emit('update:limit', Number(($event.target as HTMLSelectElement).value))"
          :value="limit"
        >
          <option value="6">6개씩 보기</option>
          <option value="12">12개씩 보기</option>
          <option value="18">9개씩 보기</option>
        </select>
      </div>
    </div>
  </form>
</template>
