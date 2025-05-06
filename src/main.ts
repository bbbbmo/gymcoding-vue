import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// console.log('MODE:', import.meta.env.MODE) // 현재 모드 (development, production, test)
// console.log('BASE_URL:', import.meta.env.BASE_URL) // 베이스 URL
// console.log('PROD:', import.meta.env.PROD) // 프로덕션 모드 여부
// console.log('DEV:', import.meta.env.DEV) // 개발 모드 여부
