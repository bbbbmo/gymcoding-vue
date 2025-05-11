<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { type Post } from '@/api/post'
import PostForm from '@/components/posts/PostForm.vue'
import useAlert from '@/composables/useAlert'
import { useAxios } from '@/composables/useAxios'

const router = useRouter()
const form = ref<Pick<Post, 'title' | 'content'>>({
  title: '',
  content: '',
})

const { vSuccess, vAlert } = useAlert()

const { error, loading, execute } = useAxios(
  '/posts',
  {
    method: 'post',
    data: { ...form.value, createdAt: new Date().toISOString() },
  },
  {
    immediate: false, // save가 실행되기 전 useAxios가 실행되면 안되기 때문에 추가
    onSuccess: () => {
      goListPage()
      vSuccess('게시글이 등록되었습니다.')
    },
    onError: (err) => {
      vAlert(err.message)
    },
  },
)
const save = async () => {
  execute({ ...form.value, createdAt: new Date().toISOString() })
}

const goListPage = () => {
  router.push({
    name: 'postList',
  })
}
</script>

<template>
  <div>
    <h2 c>게시글 등록</h2>
    <hr class="my-4" />

    <AppError v-if="error" :message="error.message" />

    <PostForm @submit.prevent="save" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary" :disabled="loading">
          <template v-if="loading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<style scoped></style>
