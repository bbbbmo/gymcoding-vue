import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs: typeof import('dayjs')
  }
}
