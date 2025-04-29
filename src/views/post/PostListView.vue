<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue'
import { getPosts, type Post } from '@/api/post'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PostDetailView from '@/views/post/PostDetailView.vue'
import AppCard from '@/components/AppCard.vue'

const router = useRouter()
const posts = ref<Post[]>([])

const fetchPost = async () => {
  try {
    ;({ data: posts.value } = await getPosts())
  } catch (error) {
    console.error(error)
  }
}

fetchPost()

const goPage = (id: number) => {
  router.push({
    name: 'postDetail',
    params: {
      id,
    },
    query: {
      searchText: 'test',
    },
    hash: '#test',
  })
}
</script>

<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div class="col-4" v-for="post in posts" :key="post.id">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createdAt="post.createdAt"
          @click="goPage(post.id ?? 0)"
        />
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="1" />
    </AppCard>
  </div>
</template>

<style scoped></style>
