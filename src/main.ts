import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// import globalComponents from './plugins/global-components'
//import funcPlugins from './plugins/func'
//import objPlugins from './plugins/obj'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import person from './plugins/person'
import globalDirective from './plugins/global-directive'
import dayjs from './plugins/dayjs'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(globalComponents)
// app.use(funcPlugins)
// app.use(objPlugins, { name: '문병준' })
app.use(globalDirective)
app.use(person, { name: '홍길동' })
app.use(dayjs)
app.mount('#app')

// console.log('MODE:', import.meta.env.MODE) // 현재 모드 (development, production, test)
// console.log('BASE_URL:', import.meta.env.BASE_URL) // 베이스 URL
// console.log('PROD:', import.meta.env.PROD) // 프로덕션 모드 여부
// console.log('DEV:', import.meta.env.DEV) // 개발 모드 여부
