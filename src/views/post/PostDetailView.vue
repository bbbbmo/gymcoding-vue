<script setup lang="ts">
import { getPostById, type Post, deletePost } from '@/api/post'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps<{
  id: string | number
}>()

const router = useRouter()

type Button = {
  text: string
  variant: string
  to?: string
  onClick?: () => Promise<void>
}

const post = ref<Post>({} as Post)
const setPost = (data: Post) => {
  post.value = { ...data }
  console.log(post.value)
}

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
    onClick: async () => {
      try {
        if (confirm('정말 삭제하시겠습니까?') === false) {
          return
        }
        await deletePost(props.id)
        router.push({ name: 'postList' })
      } catch (error) {
        console.error(error)
      }
    },
  },
]

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id)
    setPost(data)
  } catch (error) {
    console.error(error)
  }
  // post.title = data.title
  // post.content = data.content
  // post.createdAt = data.createdAt <- reactive를 사용 시 이렇게 해야함, 그냥 { ...data } 대입 시 반응형을 잃어버림
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
    </p>
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
        <button
          v-else
          class="btn"
          :class="button.variant"
          @click="button.onClick && button.onClick()"
        >
          {{ button.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
