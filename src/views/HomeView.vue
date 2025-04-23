<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.path)
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="router.push('/about')">About으로 이동</button>
  </div>
</template>
