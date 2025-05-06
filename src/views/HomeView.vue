<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import AppGrid from '@/components/AppGrid.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <h1 class="mt-4">Home</h1>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="router.push('/about')">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" v-slot="{ item }">
      <AppCard>
        <h2>{{ item }}</h2>
      </AppCard>
    </AppGrid>
  </div>
</template>
