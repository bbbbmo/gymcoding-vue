/**
 * @description 게시글 API
 */

import { posts } from './index'

export type Post = {
  id?: number | string
  title: string
  content: string
  createdAt: Date | string
}

export type Options = {
  _sort?: string
  _order?: string
  _page?: number
  _limit?: number
  title_like?: string
}

export const getPosts = (params?: Options) => {
  return posts.get('/', { params })
}

export const getPostById = (id: string | number) => {
  return posts.get(`/${id}`)
}

export const createPost = (data: Post) => {
  return posts.post('/', data)
}

export const updatePost = (id: string | number, data: Pick<Post, 'title' | 'content'>) => {
  return posts.patch(`/${id}`, data)
}

export const deletePost = (id: string | number) => {
  return posts.delete(`/${id}`)
}
