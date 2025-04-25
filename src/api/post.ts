// axios 인스턴스 생성
export type Post = {
  id: number
  title: string
  content: string
  createdAt: string
}
const posts: Post[] = [
  { id: 1, title: '제목1', content: '내용1', createdAt: '2025-04-25' },
  { id: 2, title: '제목2', content: '내용2', createdAt: '2025-04-26' },
  { id: 3, title: '제목3', content: '내용3', createdAt: '2025-04-27' },
  { id: 4, title: '제목4', content: '내용4', createdAt: '2025-04-28' },
  { id: 5, title: '제목5', content: '내용5', createdAt: '2025-04-29' },
]

export const getPosts = () => {
  return posts
}
