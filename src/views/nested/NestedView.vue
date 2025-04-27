<script setup lang="ts"></script>

<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedOne', replace: true }"
          >중첩된 라우트 1</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          :to="{ name: 'NestedTwo', replace: true }"
          >중첩된 라우트 2</RouterLink
        >
      </li>
    </ul>
    <hr class="my-4" />
    <RouterView />
  </div>
</template>

<style scoped></style>
