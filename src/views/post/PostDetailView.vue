<script setup lang="ts">
import type { Post } from '@/api/post'
import useAlert from '@/composables/useAlert'
import { useAxios } from '@/composables/useAxios'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  id: string | number
}>()

type Button = {
  text: string
  variant: string
  to?: string
  onClick?: () => void
}

const router = useRouter()
const url = computed<string>(() => `/posts/${props.id}`)
const { vAlert, vSuccess } = useAlert()

const { data: post, loading, error } = useAxios(url.value)

const {
  error: deleteError,
  loading: deleteLoading,
  execute,
} = useAxios<Post>(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.')
      router.push({ name: 'postList' })
    },
    onError: (err) => {
      vAlert(err.message)
      deleteError.value = err
    },
  },
)

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
    onClick: () => execute({}),
  },
]
</script>

<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <AppError v-if="deleteError" :message="deleteError.message" />
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <p class="text-muted">
      {{ $dayjs(post?.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
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
          :disabled="deleteLoading"
        >
          <template v-if="deleteLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> {{ button.text }} </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
