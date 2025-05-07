import type { App } from 'vue'
import focus from '@/directive/focus'
import color from '@/directive/color'
export default {
  install(app: App) {
    app.directive('focus', focus)
    app.directive('color', color)
  },
}
