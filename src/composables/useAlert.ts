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
