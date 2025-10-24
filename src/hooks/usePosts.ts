import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  GetPostsParams,
  CreatePostRequest,
  UpdatePostRequest,
} from '../types/post';

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  deleteAllPosts,
} from '../api/posts';

export const usePosts = (params?: GetPostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeleteAllPosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllPosts(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
