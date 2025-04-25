<script setup lang="ts">
import PostItem from '@/components/posts/PostItem.vue'
import { getPosts, type Post } from '@/api/post'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const posts = ref<Post[]>(getPosts())

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
    <h2 class="mt-4">게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div class="col-4" v-for="post in posts" :key="post.id">
        <PostItem
          :title="post.title"
          :content="post.content"
          :createdAt="post.createdAt"
          @click="goPage(post.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
