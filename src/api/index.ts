import axios, { type AxiosRequestConfig } from 'axios'

// 사용자 설정 새로운 axios 인스턴스 생성
const create = (baseURL: string, options?: AxiosRequestConfig) => {
  const instance = axios.create(
    Object.assign(
      { baseURL }, // 기본 요청 주소 설정
      options, // 추가 옵션 설정
    ),
  )
  return instance
}
export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`)
