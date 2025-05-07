<script setup lang="ts">
import { type Post } from '@/api/post'

defineProps<Pick<Post, 'title' | 'content'>>()

defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'update:content', value: string): void
}>()
</script>

<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        v-focus
        :value="title"
        @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        type="text"
        class="form-control"
        id="title"
        placeholder="내용을 입력해주세요"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="$emit('update:content', ($event.target as HTMLTextAreaElement).value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>
    <div class="d-flex gap-2 mt-4">
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<style scoped></style>
