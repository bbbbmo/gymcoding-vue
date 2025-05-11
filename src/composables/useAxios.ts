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
