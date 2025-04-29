import axios from 'axios'

// axios 인스턴스 생성
export type Post = {
  id?: number
  title: string
  content: string
  createdAt: Date | string
}

export const getPosts = () => {
  return axios.get('http://localhost:5000/posts')
}

export const getPostById = (id: number) => {
  return axios.get(`http://localhost:5000/posts/${id}`)
}

export const createPost = (data: Post) => {
  return axios.post('http://localhost:5000/posts', data)
}

export const updatePost = (id: number, data: Pick<Post, 'title' | 'content'>) => {
  return axios.put(`http://localhost:5000/posts/${id}`, data)
}

export const deletePost = (id: number) => {
  return axios.delete(`http://localhost:5000/posts/${id}`)
}
