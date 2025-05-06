import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PostCreateView from '@/views/post/PostCreateView.vue'
import PostDetailView from '@/views/post/PostDetailView.vue'
import PostEditView from '@/views/post/PostEditView.vue'
import PostListView from '@/views/post/PostListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NestedView from '@/views/nested/NestedView.vue'
import NestedOneView from '@/views/nested/NestedOneView.vue'
import NestedTwoView from '@/views/nested/NestedTwoView.vue'
import NestedHomeView from '@/views/nested/NestedHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/posts',
      name: 'postList',
      component: PostListView,
    },
    {
      path: '/posts/create',
      name: 'postCreate',
      component: PostCreateView,
    },
    {
      path: '/posts/:id', // 동적 URL, 하나의 컴포넌트에 여러 Url 맵핑
      name: 'postDetail',
      component: PostDetailView,
      //props: true, // id값이 props로 전달됨
      //props: { word: 'hello' }, // 객체로 전달 가능
      props: true,
    },
    {
      path: '/posts/:id/edit',
      name: 'postEdit',
      component: PostEditView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
    {
      path: '/nested',
      name: 'nested',
      component: NestedView,
      children: [
        {
          path: '',
          component: NestedHomeView,
        },
        {
          path: 'one',
          component: NestedOneView,
        },
        {
          path: 'two',
          component: NestedTwoView,
        },
      ],
    },
  ],
})

export default router
