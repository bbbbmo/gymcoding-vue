import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs
    app.provide('dayjs', dayjs)
  },
}
