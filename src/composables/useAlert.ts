import type { AlertType } from '@/components/app/AppAlert.vue'
import { ref } from 'vue'

const alerts = ref<
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
