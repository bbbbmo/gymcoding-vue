<script setup lang="ts">
/**
 * @description 게시글 목록 페이지
 */
import PostItem from '@/components/posts/PostItem.vue'
import { type Post, type Options } from '@/api/post'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import PostDetailView from '@/views/post/PostDetailView.vue'

import PostFilter from '@/components/posts/PostFilter.vue'
import PostModal from '@/components/posts/PostModal.vue'
import { useAxios } from '@/composables/useAxios'

const router = useRouter()
// 페이지네이션
const options = ref<Options>({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 3,
  title_like: '',
})
const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { method: 'get', params: options })
const totalCount = computed(() => response.value?.headers['x-total-count'])
const pageCount = computed((): number => {
  return Math.ceil(totalCount.value / (options.value._limit ?? 3))
})
// ---------
// 모달
const show = ref<boolean>(false)
const modalTitle = ref<string>('')
const modalContent = ref<string>('')
const modalCreatedAt = ref<string>('')
// ---------

const openModal = (item: Post) => {
  show.value = true
  modalTitle.value = item.title
  modalContent.value = item.content
  modalCreatedAt.value = item.createdAt
}

const currentPage = computed({
  get: () => options.value._page ?? 1,
  set: (value) => {
    options.value._page = value
  },
})

const goPage = (id: string) => {
  router.push({
    name: 'postDetail',
    params: {
      id,
    },
  })
}
</script>

<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      :title="options.title_like ?? ''"
      :limit="options._limit ?? 3"
      @update:title="(title) => (options.title_like = title)"
      @update:limit="(limit) => (options._limit = limit)"
    />
    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else>
      <AppGrid :items="posts">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :content="item.content"
            :createdAt="item.createdAt"
            @click="goPage(String(item.id ?? ''))"
            @modal="openModal(item)"
          />
        </template>
      </AppGrid>

      <AppPagination
        :current-page="currentPage"
        :page-count="pageCount"
        @update:current-page="(page: number) => (currentPage = page)"
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="String(posts[0].id)" />
      </AppCard>
    </template>
  </div>
</template>

<style scoped></style>
