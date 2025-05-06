<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [String],
    required: true,
  },
})
</script>

<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdAt.split('T')[0] }}</p>
  </AppCard>
</template>
