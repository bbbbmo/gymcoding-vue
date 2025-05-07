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
