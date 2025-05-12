<script setup lang="ts">
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

defineEmits<{
  (e: 'modal'): void
  (e: 'preview'): void
}>()
</script>

<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ $dayjs(createdAt).format('YYYY-MM-DD') }}</p>
    <template #footer>
      <div class="d-flex justify-content-end">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-arrow-up-right-square"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>
