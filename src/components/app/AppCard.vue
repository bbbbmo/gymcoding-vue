<script setup lang="ts"></script>

<template>
  <div class="card">
    <div v-if="$slots.header" class="card-hearder">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped></style>
