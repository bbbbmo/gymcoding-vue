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
      ...options,
    }
    app.config.globalProperties.$person = person
    app.provide('person', person)
  },
}
