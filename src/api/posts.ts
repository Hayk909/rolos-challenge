import axios from '@/configs/axios'

import { Post, PostsParams, PostsResponse  } from '@/types/posts.types'

const defaultValues = <PostsParams>{
	limit: 50,
	skip: 0
}

async function getPosts(params: PostsParams = defaultValues): Promise<PostsResponse> {
  
  const { data } = await axios.get('/posts', { params })

  return data
}

async function getPost(postId: Post['id']): Promise<Post> {
  const { data } = await axios.get(`/posts/${postId}`);

  return data
}

export default {
	getPosts,
	getPost
}
