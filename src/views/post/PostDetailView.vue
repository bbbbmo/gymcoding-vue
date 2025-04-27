<script setup lang="ts">
import { getPostById, type Post } from '@/api/post'
import { ref } from 'vue'

const props = defineProps<{
  id: number
}>()

type Button = {
  text: string
  variant: string
  to?: string
}

const form = ref<Post>({} as Post)

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
    to: `/posts/${props.id}/edit`,
  },
  {
    text: '삭제',
    variant: 'btn-outline-danger',
  },
]

const fetchPost = () => {
  const data = getPostById(props.id) as Post
  form.value = { ...data }
  // form.title = data.title
  // form.content = data.content
  // form.createdAt = data.createdAt <- reactive를 사용 시 이렇게 해야함, 그냥 { ...data } 대입 시 반응형을 잃어버림
}

fetchPost()
</script>

<template>
  <div>
    <h2>{{ form.title }}</h2>
    <p>{{ form.content }}</p>
    <p class="text-muted">{{ form.createdAt }}</p>
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
