<script setup lang="ts">
import { useRoute } from 'vue-router'

type Button = {
  text: string
  variant: string
  to?: string
}

const route = useRoute()

const postId = route.params.id

const leftButtons: Button[] = [
  {
    text: '이전글',
    variant: 'btn-outline-dark',
  },
  {
    text: '다음글',
    variant: 'btn-outline-dark',
  },
]

const rightButtons: Button[] = [
  {
    text: '목록',
    variant: 'btn-outline-dark',
    to: '/posts',
  },
  {
    text: '수정',
    variant: 'btn-outline-primary',
    to: `/posts/${postId}/edit`,
  },
  {
    text: '삭제',
    variant: 'btn-outline-danger',
  },
]
</script>

<template>
  <div>
    <h2 class="mt-4">제목</h2>
    <p>내용</p>
    <p class="text-muted">2025-04-25</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto" v-for="button in leftButtons" :key="button.text">
        <button class="btn" :class="button.variant">{{ button.text }}</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto" v-for="button in rightButtons" :key="button.text">
        <RouterLink v-if="button.to" :to="button.to" class="btn" :class="button.variant">{{
          button.text
        }}</RouterLink>
        <button v-else class="btn" :class="button.variant">{{ button.text }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
