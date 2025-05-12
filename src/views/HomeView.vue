<script setup lang="ts">
// import { inject } from 'vue'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// const person = inject<{ name: string; say: () => void }>('person')
// console.log(person?.name)
const position = reactive({
  x: 100, // x, y는 그냥 숫자 100, 1000 -> 반응형이 아님
  y: 1000,
})

const { x, y } = toRefs(position)
</script>

<template>
  <div>
    <h1 class="mt-4">Home</h1>
    <p>{{ $route.path }}</p>
    <div>{{ position }}</div>
    <div>{{ x }}</div>
    <div>{{ y }}</div>
    <button class="btn btn-primary" @click="router.push('/about')">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']" v-slot="{ item }">
      <AppCard>
        <h2>{{ item }}</h2>
      </AppCard>
    </AppGrid>
  </div>
</template>
