<script setup lang="ts">
import { getPostById, type Post, updatePost } from '@/api/post'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const postId = route.params.id
const form = ref<Pick<Post, 'title' | 'content'>>({
  title: '',
  content: '',
})

const setForm = (data: Post) => {
  form.value = { ...data }
}

const fetchPost = async () => {
  const { data } = await getPostById(Number(postId))
  setForm(data)
}

fetchPost()

const edit = async () => {
  try {
    await updatePost(Number(postId), { ...form.value })
    goDetailPage()
  } catch (error) {
    console.error(error)
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
</script>

<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="edit">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">제목</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          id="title"
          placeholder="내용을 입력해주세요"
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea v-model="form.content" class="form-control" id="" rows="3"></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
          취소
        </button>
        <button class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
