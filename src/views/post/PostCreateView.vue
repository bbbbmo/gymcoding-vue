<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { type Post, createPost } from '@/api/post'
import PostForm from '@/components/posts/PostForm.vue'

const router = useRouter()
const form = ref<Pick<Post, 'title' | 'content'>>({
  title: '',
  content: '',
})

const save = async () => {
  try {
    await createPost({ ...form.value, createdAt: new Date() })
    goListPage()
  } catch (error) {
    console.error(error)
  }
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
    <PostForm @submit.prevent="save" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <button type="button" class="btn btn-outline-dark me-2" @click="goListPage">목록</button>
        <button class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<style scoped></style>
