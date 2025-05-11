<script setup lang="ts">
import useAlert from '@/composables/useAlert'
import { useAxios } from '@/composables/useAxios'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const postId = route.params.id as string

const { vSuccess, vAlert } = useAlert()

const { data: form, error, loading } = useAxios(`/posts/${postId}`)

const {
  loading: editLoading,
  error: editError,
  execute,
} = useAxios(
  `/posts/${postId}`,
  { method: 'patch' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('수정이 완료되었습니다!')
      goDetailPage()
    },
    onError: (err) => {
      vAlert(err.message)
    },
  },
)

const edit = async () => {
  execute({ ...form.value })
}

const goDetailPage = () => {
  router.push({
    name: 'postDetail',
    params: {
      id: postId,
    },
  })
}
</script>

<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />
  <div v-else>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <AppError v-if="editError" :message="editError.message" />
    <PostForm @submit.prevent="edit" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goDetailPage">취소</button>
        <button class="btn btn-primary" :disabled="editLoading">
          <template v-if="editLoading">
            <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 수정 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<style scoped></style>
