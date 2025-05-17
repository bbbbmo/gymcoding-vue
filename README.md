# 짐코딩 Vue3 완벽 마스터 강의 기록

## 1일차

```jsx
app.use(router) // 이것으로 모든 디렉토리에서 router 사용 가능
```

```jsx
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute() // script에서는 이렇게 사용
console.log(route.path) // 현재 경로 알 수 있음
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>{{ $route.path }}</p> // 현재 경로 알 수 있음
    <p>{{ $route.name }}</p> // 현재 라우터 이름 알 수 있음
    <p>params: {{ $route.params }}</p> // params 알 수 있음, :id값
    <p>query: {{ $route.query }}</p> // 쿼리 값 알 수 있음
    <p>{{ $route.hash }}</p> // 해쉬 값 알 수 있음
  </div>
</template>

```

RouterLink는 html의 a태그 대신 사용 

RouterLink의 속성 중 active-class는 활성화된 링크의 텍스트를 bold로 강조

---

## 2일차

### router.push

```jsx
 router.push(`/post/${id}`) // 페이지 이동
 
 router.push({ // router에서 name을 지정해줬다면 다음과 같이도 사용 가능
    name: 'postDetail',
    params: {
      id,
    },
  })
```

같은 api를 사용해 비슷한 여러 아이템들의 데이터를 얻기 위해선 `/api경로/:id` 활용

```jsx
 {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
```

정규 표현식을 통해 존재하지 않는 경로 이동 시 404 Not Found 페이지를 보여줄 수 있음

### 중첩된 라우트

RouterView를 통해 컴포넌트 안에서 리렌더링 없이 하위 컴포넌트 여러개를 보여줄 수 있음

하위 컴포넌트에서도 다시 RouterView를 사용해 여러 하위 컴포넌트를 보여줄 수 있음 → Nested Route

```jsx
{
      path: '/nested',
      name: 'nested',
      component: NestedView,
      children: [
	      {
          path: '', // 기본 화면
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
```

routes의 children 속성을 사용

### router.replace

router.push와 비슷하지만 새로운 히스토리를 추가하지 않음

ex) router.push 사용해 페이지 이동 시, 예를 들어 Home → Detail → List 순으로 이동한다면 순서대로 히스토리가 쌓임

뒤로가기 시 List → Detail → Home 순

ex) router.replace 사용해 페이지 이동 시, 예를 들어 About → Nested → NestedOne(replace) → NestedTwo(replace) 순으로 이동한다면 뒤로가기 시 About 페이지로 이동 

---

## 3일차

### 가급적 ref를 사용하자

reactive는 뒤에 value 안붙혀도됨, 하지만 그냥 객체를 복사해 대입 시 반응성을 잃음

```jsx
const fetchPost = () => {
  const data = getPostById(props.id) as Post
  form.value = { ...data }
  // form.title = data.title
  // form.content = data.content
  // form.createdAt = data.createdAt <- reactive를 사용 시 이렇게 해야함, 그냥 { ...data } 대입 시 반응형을 잃어버림
}
```

### router의 props

router 설정 시 props 전달 여부와 어떻게 props를 넘겨줄 것인지 정의할 수 있음, 하단과 같이 정의 가능

```jsx
 {
      path: '/posts/:id', // 동적 URL, 하나의 컴포넌트에 여러 Url 맵핑
      name: 'postDetail',
      component: PostDetailView,
      //props: true, // id값이 props로 전달됨
      //props: { word: 'hello' }, // 객체로 전달 가능
      props: (route) => ({
        id: Number(route.params.id),
      }),
    },
```

PostDetailView 컴포넌트는 PostListView로부터 props(id)를 받음

### slot

**컴포넌트의 재사용성과 유연성**을 높여 주는 기능, 부모 컴포넌트가 자식 컴포넌트의 **특정 위치**에 원하는 **HTML 구조나 콘텐츠**를 “꽂아넣을” 수 있게 해 주는 창구

```jsx
// AppCard.vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-hearder">
      <slot name="header"></slot>
    </div>
    <div v-if="$slots.default" class="card-body">
      <slot></slot> // name이 없다면 default
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

slot이 여러개라면 name 속성을 통해 특정 slot을 정의할 수 있음

```jsx
// PostItem.vue
  <AppCard>
    <template #header>
      <h1>내 사이트 로고</h1>
    </template>

    <!-- default 슬롯 (이름 없으므로 #default 생략 가능) -->
    <p>여기가 본문이에요!</p>

    <!-- footer 슬롯 지정 -->
    <template #footer>
      <small>ⓒ 2025 My Company</small>
    </template>
  </AppCard>
```

#은 v-slot 약어, 다음과 같이 부모에서 사용 가능

![image.png](attachment:a243de97-4663-41b8-88cd-ce775f921be1:image.png)

### History 모드

라우터 정의 시 history도 지정

```jsx
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // history 모드
  // history: createWebHashHistory() <- hash 모드
  routes: [
    {
	    ...
	  },
	  ...
	]
})	
```

createWebHistory()의 인자로 url을 넘겨주면 그 url을 기본값으로 사용

createWebHashHistory()는 항상 url에 #이 붙음

둘의 차이는 운영 서버에 배포할 때 일어남

hash 모드는 #뒤의 url을 제거하고 서버에 요청, ex) http://localhost:3000/#nested/two →  [http://localhost:3000/](http://localhost:3000/#nested/two)

 history는 전체 경로 포함해서 요청  ex) [http://localhost:3000/nested/two](http://localhost:3000/#nested/two) →  [http://localhost:3000/](http://localhost:3000/#nested/two)nested/two

hash 모드 사용 시 하나의 페이지만 보여주므로 검색엔진 최적화에 불리 → 대부분 배포 시 history 모드 사용

---

## 4일차

### json-server

백엔드 없이 애플리케이션 구현을 위해 json-server 사용

```bash
npm install -D json-server
```

-D 옵션은 배포시 사용하지 않는 개발용 설치 명령어 (devDependencies)에 추가

-g 옵션은 전역 설치

`실행명령어`

```bash
npx json-server --watch db.json // 로컬로 설치 시 npx 사용
```

생성된 db.json에 api 경로와 전송될 데이터 입력 가능

### axios

```jsx
const posts = ref<Post[]>([])

const fetchPost = async () => {
  try {
    ;({ data: posts.value } = await getPosts())
  } catch (error) {
    console.error(error)
  }
}
```

axios의 get 요청 시 다음과 같이 구조 분해 할당으로 바로 data에 접근가능 또한 :posts.value로 바로 posts.value에 data의 값을 할당 가능

---

## 5일차

### 페이지네이션 & 필터

json-db에선 다음과 같은 parameters를 넘겨주어 정렬과 페이지네이션 & 필터 기능을 구현 가능

```jsx
const params = ref({
  _sort: 'createdAt', // 정렬
  _order: 'desc', // 정렬 방식
  _page: 1, // 페이지
  _limit: 3, // 한 페이지 당 아이템 수
  title_like: '' // 해당 키워드를 가진 데이터 검색
})
```

### watchEffect

콜백함수인 fetchPost안의 반응형 데이터(posts, params)가 변경될 시 자동으로 다시 실행

```jsx
const fetchPost = async () => {
  try {
    const { data, headers } = await getPosts(params.value)
    posts.value = data
    totalCount.value = Number(headers['x-total-count'])
  } catch (error) {
    console.error(error)
  }
}

watchEffect(async () => {
  await fetchPost()
})
```

[Vue.js](https://ko.vuejs.org/api/reactivity-core.html#watcheffect)

### axios.create

사용자 설정에 맞춘 새로운 axios 인스턴스 생성을 위해 다음과 같이 작성

```jsx
// @api/index.ts
import axios, { type AxiosRequestConfig } from 'axios'

// 새로운 axios 인스턴스 생성
const create = (baseURL: string, options?: AxiosRequestConfig) => {
  const instance = axios.create(
    Object.assign(
      { baseURL }, // 기본 요청 주소 설정
      options, // 추가 옵션 설정
    ),
  )
  return instance
}
export const posts = create('http://localhost:5000/posts/')
```

```jsx
// @api/posts.ts
import { posts } from './index' // import axios from 'axios' <- 대체

export const getPosts = (params?: Params) => {
  return posts.get('/', { params }) // 중복되는 경로 삭제 가능
}

export const getPostById = (id: number) => {
  return posts.get(`/${id}`)
}
// ...
```

### Vue 환경변수

개발, 배포 시 api 주소가 달라지기 때문에 환경에따라 경로 자동으로 변경하는 환경변수 설정

```jsx
// main.ts
console.log('MODE:', import.meta.env.MODE) // 현재 모드 (development, production, test)
console.log('BASE_URL:', import.meta.env.BASE_URL) // 베이스 URL
console.log('PROD:', import.meta.env.PROD) // 프로덕션 모드 여부
console.log('DEV:', import.meta.env.DEV) // 개발 모드 여부
console.log('VITE_APP_API_URL', import.meta.env.VITE_APP_API_URL) // 환경에 따른 경로
```

```jsx
// .env.development
VITE_APP_API_URL=http://localhost:5000/ // 개발 환경에서 사용할 환경변수, VITE를 꼭 붙혀야 함
```

만약 앞에 VITE 말고 다른 이름을 사용하고 싶다면 vite.config.ts에서 envPrefix 추가 설정

```jsx
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  envPrefix: '원하는거', // <- 여기 설정
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

[Vite의 환경 변수와 모드](https://ko.vite.dev/guide/env-and-mode.html#node-env-and-modes)

### defineProps & defineEmits와 컴포넌트

`defineProps` 및 `defineEmits`는 `<script setup>` 내에서만 사용할 수 있는 **컴파일러 매크로**

타입 선언, 또는 런타임 선언으로 사용하며 둘다 선언할 수는 없음 다음은 타입선언

타입 선언의 경우 기본 props값을 줄 수 없음 → `withDefaults` 컴파일러 매크로 사용

```jsx
defineProps<{
  title: string
  content: string
}>()

defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'update:content', value: string): void
}>()
```

update:”props 이름”시 부모에게 바뀐 데이터를 전달, 템플릿에선 다음과 같이 사용

```jsx
<template>
  <form>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        :value="title"
        @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        type="text"
        class="form-control"
        id="title"
        placeholder="내용을 입력해주세요"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        :value="content"
        @input="$emit('update:content', ($event.target as HTMLTextAreaElement).value)"
        class="form-control"
        id="content"
        rows="3"
      ></textarea>
    </div>
    <slot name="actions"></slot>
  </form>
</template>
```

자식 컴포넌트의 input에서 입력한 데이터를 부모 컴포넌트에서 사용할 수 있음

```jsx
// 부모 컴포넌트
<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm @submit.prevent="edit" v-model:title="form.title" v-model:content="form.content">
      <template #actions>
        <div class="pt-4">
          <button type="button" class="btn btn-outline-danger me-2" @click="goDetailPage">
            취소
          </button>
          <button class="btn btn-primary">수정</button>
        </div>
      </template>
    </PostForm>
  </div>
</template>
```

[Vue.js](https://ko.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)

---

## 6일차

### Alert 컴포넌트 & Transition

```jsx
// Alert 컴포넌트
<script setup lang="ts">
/**
 * @description 알림 컴포넌트
 * @param {boolean} show - 알림 표시 여부
 * @param {string} message - 알림 메시지
 * @param {AlertType} type - 알림 타입
 */
import { computed } from 'vue'

export type AlertType = 'success' | 'error'

const props = withDefaults(
  defineProps<{
    show: boolean
    message: string
    type: AlertType
  }>(),
  {
    show: false,
    message: '',
    type: 'error',
  },
)

const typeStyle = computed(() => {
  return props.type === 'error' ? 'alert-danger' : 'alert-primary'
})
</script>

<template>
  <Transition>
    <div class="app-alert alert" :class="typeStyle" role="alert" v-if="show">{{ message }}</div>
  </Transition>
</template>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

```

`<Transition>`은 Vue에 내장된 컴포넌트로 컴포넌트가 나타나거나 사라질 때 애니메이션을 적용하기 위해 사용, 다음과 같은 상황에서 트리거

- `v-if`
- `v-show`
- `<component>`라는 특수 엘리먼트를 통한 동적 컴포넌트 토글

[Vue.js](https://ko.vuejs.org/guide/built-ins/transition.html)

### TransitionGroup

`<TransitionGroup>`은 마찬가지로 내장 컴포넌트로, 리스트에서 렌더링되는 요소 또는 컴포넌트의 삽입, 제거 및 순서 변경을 애니메이션으로 만들어 줌

예를 들어 alert 메시지가 여러개일 때 사용

```jsx
<script setup lang="ts">
/**
 * @description 알림 컴포넌트
 * @param {string} message - 알림 메시지
 * @param {AlertType} type - 알림 타입
 */
export type AlertType = 'success' | 'error'

withDefaults(
  defineProps<{
    items: {
      message: string
      type: AlertType
    }[]
  }>(),
  {
    items: () => [],
  },
)

const typeStyle = (type: AlertType) => {
  return type === 'error' ? 'alert-danger' : 'alert-primary'
}
</script>

<template>
  <TransitionGroup name="slide">
    <div
      v-for="({ message, type }, index) in items"
      :key="index"
      class="alert"
      :class="typeStyle(type)"
      role="alert"
    >
      {{ message }}
    </div>
  </TransitionGroup>
</template>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

```

### 모달 컴포넌트 & Teleport

modelValue를 설정해 부모에서 `v-model=”show”` 로 모달 여닫음

```jsx
// PostModal.vue
<script setup lang="ts">
import AppModal from '@/components/AppModal.vue'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  content: string
  createdAt: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// computed는 읽기 전용이지만 get, set으로 쓰기도 가능
const show = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const closeModal = () => {
  show.value = false
}
</script>

<template>
  <Transition name="modal">
    <AppModal v-model="show" title="게시글">
      <template #default>
        <div class="row g-3">
          <div class="col-3 text-muted">제목</div>
          <div class="col-9">{{ title }}</div>
          <div class="col-3 text-muted">내용</div>
          <div class="col-9">{{ content }}</div>
          <div class="col-3 text-muted">등록일</div>
          <div class="col-9">{{ createdAt.split('T')[0] }}</div>
        </div>
      </template>
      <template #actions>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
          닫기
        </button>
      </template>
    </AppModal>
  </Transition>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}
</style>

```

모달 open 시 css 충돌되는 현상 발생

![image.png](attachment:9cac36d7-9722-4088-8264-8b2048cbec2b:image.png)

모달은 논리적으로 모든 컴포넌트 위를 덮어씌우므로 최상단에 위치해야하지만 페이지 컴포넌트 안에서 호출할 수 밖에 없음 → `Teleport` 컴포넌트 사용해 DOM 최상단으로 이동

![image.png](attachment:b7b93508-0bdf-45b5-abdb-9db9e4c579db:image.png)

- index.html
    
    ```html
    <!doctype html>
    <html lang="">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
      </head>
      <body>
        <div id="app"></div>
        <!-- 추가 -->
        <div id="modal"></div> 
        <script type="module" src="/src/main.ts"></script>
      </body>
    </html>
    ```
    
- PostListView.vue
    
    ```jsx
    <Teleport to="#modal">
          <PostModal
            v-model="show"
            :title="modalTitle"
            :content="modalContent"
            :created-at="modalCreatedAt"
          />
    </Teleport>
    ```
    

[Vue.js](https://ko.vuejs.org/guide/built-ins/teleport.html)

### Vue3 플러그인 만들기

플러그인은 다음과 같은 상황에서 사용

- `app.component()` 메서드를 사용하여 전역 컴포넌트를 등록 하고자 할 때
- `app.directive()` 메서드를 사용하여 커스텀 디렉티브를 등록 하고자 할 때
- `app.provide()`를 사용하여 앱 전체에 리소스(메서드 또는 데이터)를 주입할 때

함수로 생성하는 방식과 객체로 생성하는 방식이 있음

- src/plugins/obj.ts
    
    ```jsx
    import type { App } from 'vue'
    
    const objPlugins = {
      install(app: App, options: object) {
        console.log('objPlugins app', app)
        console.log('objPlugins options', options)
        // app.component() 전역 컴포넌트 설정
        // app.config.globalProperties 전역 애플리케이션 인스턴스의 프로퍼티 설정
        // app.directive() 커스텀 디렉티브 설정
      },
    }
    
    export default objPlugins
    ```
    
- src/plugins/func.ts
    
    ```jsx
    function funcPlugins() {
      console.log('funcPlugins')
    }
    
    export default funcPlugins
    ```
    

다음과 같이 설치

- main.ts
    
    ```jsx
    // main.ts
    import './assets/main.css'
    import 'bootstrap-icons/font/bootstrap-icons.css'
    import 'bootstrap/dist/css/bootstrap.min.css'
    
    import funcPlugins from './plugins/func'
    import objPlugins from './plugins/obj'
    
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'
    
    import App from './App.vue'
    import router from './router'
    
    const app = createApp(App)
    
    app.use(createPinia())
    app.use(router)
    app.use(funcPlugins)
    app.use(objPlugins)
    
    app.mount('#app')
    ```
    
- 예제) person 플러그인
    
    전역에서 사용할 수 있는 객체 생성함
    
    ```jsx
    // src/plugins/person.ts
    import type { App } from 'vue'
    
    export default {
      install(app: App, options: object) {
        const person = {
          name: '문병준',
          age: 20,
          gender: 'male',
          say() {
            alert(this.name)
          },
          ...options, // options로 person 내용 변경 가능 ex) { name: "홍길동" }
        }
        app.config.globalProperties.$person = person // 전역 프로퍼티 생성
        app.provide('person', person) 
      },
    }
    ```
    
    다음과 같이 사용
    
    ```jsx
    // src/views/HomeView.vue
    <script setup lang="ts">
    import AppCard from '@/components/AppCard.vue'
    import AppGrid from '@/components/AppGrid.vue'
    import { inject } from 'vue'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const person = inject<{ name: string; say: () => void }>('person') // inject로 프로퍼티 주입
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
    ```
    
    ![image.png](attachment:1b66a23a-8769-47d9-b3be-5005c50b7f01:image.png)
    

### 전역 컴포넌트 등록

전역에서 사용되는 컴포넌트들을 일일히 import하지 않고 main.ts에서 플러그인으로 등록해 사용

- src/plugins/global-components.ts
    
    ```jsx
    import AppAlert from '@/components/app/AppAlert.vue'
    import AppCard from '@/components/app/AppCard.vue'
    import AppGrid from '@/components/app/AppGrid.vue'
    import AppModal from '@/components/app/AppModal.vue'
    import AppPagination from '@/components/app/AppPagination.vue'
    import type { App } from 'vue'
    
    export default {
      install(app: App) {
        app.component('AppAlert', AppAlert)
        app.component('AppCard', AppCard)
        app.component('AppGrid', AppGrid)
        app.component('AppModal', AppModal)
        app.component('AppPagination', AppPagination)
      },
    }
    ```
    
- main.ts
    
    ```jsx
    import globalComponents from './plugins/global-components'
    
    app.use(globalComponents)
    ```
    

이때 컴포넌트들 타입 선언 필요

- components.d.ts
    
    ```jsx
    declare module '@vue/runtime-core' {
      export interface GlobalComponents {
        RouterLink: (typeof import('vue-router'))['RouterLink']
        RouterView: (typeof import('vue-router'))['RouterView']
        AppAlert: (typeof import('./src/components/app/AppAlert.vue'))['default']
        AppCard: (typeof import('./src/components/app/AppCard.vue'))['default']
        AppGrid: (typeof import('./src/components/app/AppGrid.vue'))['default']
        AppModal: (typeof import('./src/components/app/AppModal.vue'))['default']
        AppPagination: (typeof import('./src/components/app/AppPagination.vue'))['default']
      }
    }
    
    export {}
    ```
    

`unplugin-vue-components` 설치 시 위와 같은 과정 생략 가능

```bash
npm i unplugin-vue-components -D
```

[npm: unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components)

`vite.config.ts`에 다음과 같이 설정

```jsx
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
	    dirs: ['src/components'], // 가져오길 원하는 컴포넌트들이 있는 경로
      dts: true, // components.d.ts에 자동 추가할지 여부
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

알아서 `components.d.ts`에 컴포넌트 추가해줌

```jsx
// components.d.ts
/* eslint-disable */
// @ts-nocheck
// Generated by unplugin-vue-components
// Read more: https://github.com/vuejs/core/pull/3399
// biome-ignore lint: disable
export {}

/* prettier-ignore */
declare module 'vue' {
  export interface GlobalComponents {
    AppAlert: typeof import('./src/components/app/AppAlert.vue')['default']
    AppCard: typeof import('./src/components/app/AppCard.vue')['default']
    AppGrid: typeof import('./src/components/app/AppGrid.vue')['default']
    AppModal: typeof import('./src/components/app/AppModal.vue')['default']
    AppPagination: typeof import('./src/components/app/AppPagination.vue')['default']
    PostFilter: typeof import('./src/components/posts/PostFilter.vue')['default']
    PostForm: typeof import('./src/components/posts/PostForm.vue')['default']
    PostItem: typeof import('./src/components/posts/PostItem.vue')['default']
    PostModal: typeof import('./src/components/posts/PostModal.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}
```

### 커스텀 디렉티브 등록

`v-if`, `v-for` 같은 디렉티브를 커스텀으로 만들 수 있음

low-level DOM 접근과 관련된 로직을 재사용하기 위해 사용

`v-focus`  → html의 autofocus와는 달리 컴포넌트 재생성 시에도 유지되는 이점

```jsx
// src/directive/focus.ts
export default {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
}
```

`v-color`

```jsx
// src/directive/color.ts
import type { DirectiveBinding } from 'vue'

function color(el: HTMLElement, binding: DirectiveBinding) {
  el.style.color = binding.value
}

export default color
```

커스텀 디렉티브가 여러개일 시 플러그인으로 만들어 사용하면 main.ts에 여러번 import하는 것을 방지

```jsx
// src/plugins/global-directive.ts
import type { App } from 'vue'
import focus from '@/directive/focus'
import color from '@/directive/color'
export default {
  install(app: App) {
    app.directive('focus', focus)
    app.directive('color', color)
  },
}
```

PostForm에서 다음과 같이 사용

```jsx
// src/components/posts/PostForm.vue
<input
	v-focus
  v-color="'red'"
  :value="title"
  @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
  type="text"
  class="form-control"
	id="title"
  placeholder="내용을 입력해주세요"
/>
```

![image.png](attachment:c9c388c0-3d16-465f-a073-367c138525da:image.png)

커스텀 컴포넌트에는 커스텀 디렉티브 사용 X

### day.js 플러그인 등록

날짜 포맷팅을 쉽게 도와주는 플러그인

```bash
npm install dayjs
```

```jsx
// src/plugins/dayjs.ts
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs
    app.provide('dayjs', dayjs)
  },
}
```

[Day.js · 2kB JavaScript date utility library](https://day.js.org/)

---

## 7일차

### Composable

단순히 자바스크립트 함수를 모듈화한것이 아닌 **Vue Composition API를 활용해** 상태 저장 로직이 포함됨

Composable 함수 내부의 상태는 호출한 컴포넌트마다 별개로 생성

### Alert 컴포저블 함수

```jsx
// src/composables/alert.ts
  const alerts = ref< // 아직 Pinia 도입 전이므로 모듈 스코프를 통해 상태 공유 가능하게 함
    {
      message: string
      type: AlertType
    }[]
  >([])
export default function useAlert() {
  const vAlert = (message: string, type?: AlertType) => {
    alerts.value.push({
      message,
      type: type || 'error',
    })

    setTimeout(() => {
      alerts.value.shift()
    }, 2000)
  }

  const vSuccess = (message: string) => {
    vAlert(message, 'success')
  }

  return {
    alerts,
    vAlert,
    vSuccess,
  }
}
```

```jsx
// 이렇게 호출해 사용
const { vSuccess, vAlert } = useAlert()
```

AppAlert같은 경우 페이지 이동 시 사라지므로 최상단 루트인 App.vue에 위치

```jsx
// App.vue
<script setup lang="ts">
import TheHeader from './layouts/TheHeader.vue'
import TheView from './layouts/TheView.vue'
import AppAlert from './components/app/AppAlert.vue'
import useAlert from './composables/alert'

const { alerts } = useAlert()
</script>

<template>
  <TheHeader />
  <TheView />
  <AppAlert :items="alerts" />
</template>
<style scoped></style>
```

### axios 컴포저블 함수 구현

```jsx
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { isRef, ref, unref, watch } from 'vue'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

// interface 대신 type alias 사용
type UseAxiosOptions<T> = {
  immediate?: boolean
  onSuccess?: (res: AxiosResponse<T>) => void
  onError?: (err: Error) => void
}

export function useAxios<T = any>(
  url: string,
  config: AxiosRequestConfig = {},
  options: UseAxiosOptions<T> = {},
) {
  const response = ref<AxiosResponse<T> | null>(null)
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const params = config.params
  const { immediate = true, onSuccess, onError } = options

  const execute = async (body?: any) => {
    loading.value = true
    data.value = null
    error.value = null

    try {
      const res = await axios.request<T>({
        url,
        ...config,
        params: unref(params),
        data: body,
      })
      response.value = res
      data.value = res.data
      onSuccess?.(res)
    } catch (err: any) {
      error.value = err
      onError?.(err)
    } finally {
      loading.value = false
    }
  }

  if (isRef(params)) {
    watch(
      () => unref(params),
      () => {
        if (immediate) execute()
      },
      { immediate },
    )
  } else if (immediate) {
    execute()
  }

  return {
    response,
    data,
    loading,
    error,
    execute,
  }
}
```

### isRef

값이 ref 객체인지 확인해 true, false 반환

### unref

인자가 ref이면 내부 값을 반환하고 그렇지 않으면 인자 자체를 반환

---

## 8일차

### toRef

반응형 객체의 프로퍼티를 반응형으로 꺼내고 싶을 때 + 원본 값과 동기화하고 싶을 때 사용

```jsx
import { reactive, toRef } from 'vue'

const position = reactive({
  x: 100, // x, y는 그냥 숫자 100, 1000 -> 반응형이 아님
  y: 1000,
})
const x = toRef(position, 'x') // x, y 변경 시 position.x, position.y도 같이 변함
const y = toRef(position, 'y')
```

[Vue.js](https://ko.vuejs.org/api/reactivity-utilities.html#toref)

### toRefs

위와 동일하지만 구조분해 할당을 하여 여러개를 가져오고 싶을때 사용

```jsx
const { x, y } = toRefs(position)
```

실무에선? ⇒ props로 받은 데이터를 반응형을 유지하기 위해 사용 

reactive 반응형 객체를 toRefs에 감싸서 return하면 사용하는 쪽에서 반응형을 잃지 않고 사용 가능

[Vue.js](https://ko.vuejs.org/api/reactivity-utilities.html#torefs)

### Pinia와 상태관리의 필요성

`view`

state가 선언적으로 매핑된 템플릿

`state`

컴포넌트의 선언된 상태(data)

`actions`

view에서 사용자의 이벤트에 대한 핸들러로 state를 변경할 수 있음, 위 3가지의 연동으로 상태가 업데이트됨

하지만 하위 컴포넌트가 늘어나 props drilling이 발생하면 위와 같은 구조가 무너져버림

→ 컴포넌트의 상태를 특정 컴포넌트가 아닌 중앙에서 관리(Pinia)

```bash
npm install pinia
```

```jsx
// main.ts
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
```

### state, getters, setters

*Setup Store* 내에서:

- `ref()`는 `state` 프로퍼티가 됨.
- `computed()`는 `getters` 프로퍼티가 됨.
- `function()`은 `actions` 프로퍼티가 됨.
- src/stores/counter.ts
    
    ```jsx
    import { ref, computed } from 'vue'
    import { defineStore } from 'pinia' // 스토어 정의
    
    // use로 시작, 첫번재 인자는 해당 스토어의 고유 아이디값
    // 두번째인자는 옵션(state, getters, setters)
    export const useCounterStore = defineStore('counter', () => {
      const count = ref(0) // state
      const doubleCount = computed(() => count.value * 2) // getters
      function increment() { // actions
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
    ```
    

[Pinia 🍍](https://pinia.vuejs.kr/core-concepts/)

### storeToRefs

Store에서 프로퍼티를 추출(구조 분해 할당)하면서 반응성을 유지하려면 `storeToRefs()`를 사용

```jsx
// src/views/AboutView.vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
const store = useCounterStore() // 그냥 가져옴
const { count } = storeToRefs(store) // 구조 분해 할당으로 가져옴 <- 가급적 이걸 사용
</script>

<template>
  <div>
    <h1>About</h1>
    <button class="btn btn-primary" @click="goHome">Home으로 이동</button>
  </div>
  <p>counter: {{ store.count }}</p>
  <p>counter2: {{ count }}</p>
  <p>getters: {{ store.doubleCount }}</p>
  <button @click="store.increment">count++</button>
</template>
```

### Alert Store

Alert 상태는 다양한 곳에서 사용. store로 이동

```jsx
// src/stores/alert.ts
import type { AlertType } from '@/components/app/AppAlert.vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<
    {
      message: string
      type: AlertType
    }[]
  >([])
  const vAlert = (message: string, type?: AlertType) => {
    alerts.value.push({
      message,
      type: type || 'error',
    })

    setTimeout(() => {
      alerts.value.shift()
    }, 2000)
  }

  const vSuccess = (message: string) => {
    vAlert(message, 'success')
  }

  return {
    alerts,
    vAlert,
    vSuccess,
  }
})

```

```jsx
// src/composables/useAlert.ts
import { useAlertStore } from '@/stores/alert'
import { storeToRefs } from 'pinia'

export default function useAlert() {
  const { alerts } = storeToRefs(useAlertStore())
  const { vAlert, vSuccess } = useAlertStore()
  return {
    alerts,
    vAlert,
    vSuccess,
  }
}
```

---

## 9일차

### 네비게이션 가드

페이지 이동 시 리다이렉션, 취소 등으로 특정 페이지 진입을 막는 방법

전역, 라우트별, 컴포넌트 네비게이션 가드가 있음

### 전역 네비게이션 가드

`router.beforEach()` 는 콜백 함수를 인자로 받으며 콜백함수의 인자는 다음과 같음

- to (이동할 페이지 정보)
    
    ```jsx
    {
        "fullPath": "/my",
        "path": "/my",
        "query": {},
        "hash": "",
        "name": "myPage",
        "params": {},
        "matched": [
            {
                "path": "/my",
                "name": "myPage",
                "meta": {},
                "props": {
                    "default": false
                },
                "children": [],
                "instances": {
                    "default": {}
                },
                "leaveGuards": {},
                "updateGuards": {},
                "enterCallbacks": {},
                "components": {
                    "default": {
                        "__hmrId": "5dd96382",
                        "__file": "/home/bbbbmo/vue/gymcoding-vue/src/views/MyPage.vue"
                    }
                }
            }
        ],
        "meta": {},
        "href": "/my"
    }
    ```
    
- from (이전 페이지 정보)
    
    ```jsx
    {
        "fullPath": "/posts",
        "path": "/posts",
        "query": {},
        "hash": "",
        "name": "postList",
        "params": {},
        "matched": [
            {
                "path": "/posts",
                "name": "postList",
                "meta": {},
                "props": {
                    "default": false
                },
                "children": [],
                "instances": {
                    "default": null
                },
                "leaveGuards": {},
                "updateGuards": {},
                "enterCallbacks": {},
                "components": {
                    "default": {
                        "__name": "PostListView",
                        "__hmrId": "e331f3e0",
                        "__file": "/home/bbbbmo/vue/gymcoding-vue/src/views/post/PostListView.vue"
                    }
                }
            }
        ],
        "meta": {},
        "href": "/posts"
    }
    ```
    

```jsx
// 전역 네비게이션 가드
router.beforeEach((to, from) => {
  console.log(to)
  console.log(from)
  // if (to.name === 'myPage') { // 페이지 이동 취소
  //   return false
  // }
  if (to.name === 'myPage') {
    // 페이지 리다이렉션
    return { name: 'home' }
  }
})
```

`router.beforEach()` 는 리턴값으로 페이지 이동을 제어할 수 있음

- true를 return한다면 변경없이 페이지 라우팅
- false를 return한다면 라우팅을 취소할 수 있음
- 페이지 이름 객체를 return한다면 해당 페이지로 리다이렉션

### 라우트 가드

`router.beforeEnter()` 는 라우트 설정 객체에 직접 정의

마찬가지로 to, from을 인자로 받으며 이동할 페이지, 이동 전 페이지의 정보를 얻을 수 있음

```jsx
{
      path: '/my',
      name: 'myPage',
      component: MyPage,
      beforeEnter: (to, from) => {
        console.log(to)
        console.log(from)
        if (Object.keys(to.query).length > 0) {
        // 쿼리가 존재한다면 그대로 이동 후 쿼리 삭제
        return { path: to.path, query: {} }
        }
      },
      // beforeEnter: [removeQueryString], // 요구 사항이 많을 시 이런 방식도 가능
    },
```

### 컴포넌트 내 가드

`onBeforeRouteEnter()` 는 네비게이션 이동이 확정된 후 컴포넌트가 만들어지기 이전에 실행되는 가드

`onBeforeRouteLeave()` 는 라우트를 떠날 때 실행되는 가드

```jsx
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate(() => { // 경로 변경 시 실행
  console.log('onBeforeRouteUpdate')
})

onBeforeRouteLeave(() => { // 페이지 떠날 때 실행
  console.log('onBeforeRouteLeave')
})
```

[Vue Router](https://router.vuejs.org/guide/advanced/navigation-guards.html)
