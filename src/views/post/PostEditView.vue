<script setup lang="ts">
import { getPostById, type Post, updatePost } from '@/api/post'
import type { AlertType } from '@/components/app/AppAlert.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const postId = route.params.id as string
const form = ref<Pick<Post, 'title' | 'content'>>({
  title: '',
  content: '',
})

const alerts = ref<
  {
    message: string
    type: AlertType
  }[]
>([])

const setForm = (data: Post) => {
  form.value = { ...data }
}

const fetchPost = async () => {
  try {
    const { data } = await getPostById(postId)
    setForm(data)
  } catch (error) {
    console.error(error)
    vAlert(error instanceof Error ? error.message : String(error))
  }
}

fetchPost()

const edit = async () => {
  try {
    await updatePost(postId, { ...form.value })
    goDetailPage()
    vAlert('수정이 완료되었습니다!', 'success')
  } catch (error) {
    console.error(error)
    vAlert(error instanceof Error ? error.message : String(error))
  }
}

const goDetailPage = () => {
  router.push({
    name: 'postDetail',
    params: {
      id: postId,
    },
  })
}

const vAlert = (message: string, type?: AlertType) => {
  alerts.value.push({
    message,
    type: type || 'error',
  })

  setTimeout(() => {
    alerts.value.shift()
  }, 2000)
}
</script>

<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm @submit.prevent="edit" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-danger" @click="goDetailPage">취소</button>
        <button class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
  <AppAlert :items="alerts" />
</template>

<style scoped></style>
