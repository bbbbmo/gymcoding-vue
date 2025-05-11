<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="text-center text-danger py-4">{{ message }}</div>
</template>

<style scoped></style>
