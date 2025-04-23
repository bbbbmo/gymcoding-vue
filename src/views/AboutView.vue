<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h1>About</h1>
    <button class="btn btn-primary" @click="goHome">Home으로 이동</button>
  </div>
</template>
