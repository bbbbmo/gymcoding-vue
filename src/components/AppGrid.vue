<script setup lang="ts">
/**
 * @description 그리드 레이아웃을 위한 컴포넌트
 */

withDefaults(
  defineProps<{
    items: Array<any>
    colClass?: string
  }>(),
  {
    colClass: 'col-4', // 기본값
  },
)
</script>

<template>
  <div class="row g-3">
    <div v-for="(item, index) in items" :key="index" :class="colClass">
      <slot :item="item" :index="index"></slot>
    </div>
  </div>
</template>
