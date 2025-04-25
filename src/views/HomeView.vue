<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h1 class="mt-4">Home</h1>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="router.push('/about')">About으로 이동</button>
  </div>
</template>
