<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const person = inject<{ name: string; say: () => void }>('person')
console.log(person?.name)
</script>

<template>
  <div>
    <h1 class="mt-4">Home</h1>
    <p>{{ $route.path }}</p>
    <h2>{{ person?.name }}</h2>
    <button class="btn btn-primary" @click="person?.say">click person</button>
    <button class="btn btn-primary" @click="router.push('/about')">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" v-slot="{ item }">
      <AppCard>
        <h2>{{ item }}</h2>
      </AppCard>
    </AppGrid>
  </div>
</template>
