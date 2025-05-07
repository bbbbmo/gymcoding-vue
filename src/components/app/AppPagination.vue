<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  pageCount: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.pageCount) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const isPrevPage = computed(() => {
  return props.currentPage === 1
})

const isNextPage = computed(() => {
  return props.currentPage === props.pageCount
})

const isActive = (page: number) => {
  return page === props.currentPage
}
</script>

<template>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: isPrevPage }">
        <a class="page-link" href="#" @click.prevent="prevPage">Prev</a>
      </li>
      <li
        v-for="page in pageCount"
        :key="page"
        class="page-item"
        :class="{ active: isActive(page) }"
      >
        <a class="page-link" href="#" @click.prevent="() => emit('update:currentPage', page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: isNextPage }">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
