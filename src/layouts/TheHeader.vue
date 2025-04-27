<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goPage = () => {
  router.push({
    name: 'postCreate',
  })
}
</script>

<template>
  <header class="mb-4">
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">GYM CODING</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/posts">게시글</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/nested"
                >중첩된 라우트</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button class="btn btn-outline-light" type="button" @click="goPage">글쓰기</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
