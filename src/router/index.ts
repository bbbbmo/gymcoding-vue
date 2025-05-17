import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router'
import PostCreateView from '@/views/post/PostCreateView.vue'
import PostDetailView from '@/views/post/PostDetailView.vue'
import PostEditView from '@/views/post/PostEditView.vue'
import PostListView from '@/views/post/PostListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MyPage from '@/views/MyPage.vue'
// import NestedView from '@/views/nested/NestedView.vue'
// import NestedOneView from '@/views/nested/NestedOneView.vue'
// import NestedTwoView from '@/views/nested/NestedTwoView.vue'
// import NestedHomeView from '@/views/nested/NestedHomeView.vue'

const removeQueryString = (to: RouteLocationNormalizedGeneric) => {
  if (Object.keys(to.query).length > 0) {
    // 쿼리가 존재한다면 그대로 이동 후 쿼리 삭제
    return { path: to.path, query: {} }
  }
}

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
      path: '/my',
      name: 'myPage',
      component: MyPage,
      beforeEnter: [removeQueryString],
    },
    // {
    //   path: '/nested',
    //   name: 'nested',
    //   component: NestedView,
    //   children: [
    //     {
    //       path: '',
    //       component: NestedHomeView,
    //     },
    //     {
    //       path: 'one',
    //       component: NestedOneView,
    //     },
    //     {
    //       path: 'two',
    //       component: NestedTwoView,
    //     },
    //   ],
    // },
  ],
})

// 전역 네비게이션 가드
// router.beforeEach((to, from) => {
//   console.log(to)
//   console.log(from)
//   // if (to.name === 'myPage') { // 페이지 이동 취소
//   //   return false
//   // }
//   if (to.name === 'myPage') {
//     // 페이지 리다이렉션
//     return { name: 'home' }
//   }
// })
export default router
