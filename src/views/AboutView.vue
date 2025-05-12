<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store)
</script>

<template>
  <div>
    <h1>About</h1>
    <button class="btn btn-primary" @click="goHome">Home으로 이동</button>
  </div>
  <p>counter: {{ store.count }}</p>
  <p>counter2: {{ count }}</p>
  <p>getters: {{ doubleCount }}</p>
  <button @click="store.increment">count++</button>
</template>
