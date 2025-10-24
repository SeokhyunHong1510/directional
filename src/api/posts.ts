import type {
  CreatePostRequest,
  GetPostsParams,
  GetPostsResponse,
  MockPostsResponse,
  Post,
  UpdatePostRequest,
} from '../types/post';

import apiClient from './client';

export const getMockPosts = async (
  count: number = 300,
): Promise<MockPostsResponse> => {
  const response = await apiClient.get<MockPostsResponse>('/mock/posts', {
    params: { count },
  });
  return response.data;
};

export const getPosts = async (
  params?: GetPostsParams,
): Promise<GetPostsResponse> => {
  const response = await apiClient.get<GetPostsResponse>('/posts', {
    params,
  });
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', data);
  return response.data;
};

export const updatePost = async (
  id: string,
  data: UpdatePostRequest,
): Promise<Post> => {
  const response = await apiClient.patch<Post>(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};

export const deleteAllPosts = async (): Promise<void> => {
  await apiClient.delete('/posts');
};
