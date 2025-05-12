import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  // state: () => {
  //   counter: 0
  // },
  // getters: () => {
  //   doubleCount: (state) => state.counter * 2
  // },
  // actions: {
  //   increament() {
  //     this.counter++
  //   }
  // }

  return { count, doubleCount, increment }
})
