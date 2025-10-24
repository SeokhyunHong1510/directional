import { useState, useEffect } from 'react';

import type { GetPostsParams, GetPostsResponse, Post } from '../types/post';

import { getPosts, getPost } from '../api/posts';

export const usePosts = (params?: GetPostsParams) => {
  const [data, setData] = useState<GetPostsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPosts(params);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params?.limit,
    params?.prevCursor,
    params?.nextCursor,
    params?.sort,
    params?.order,
    params?.category,
    params?.from,
    params?.to,
    params?.search,
  ]);

  return { data, isLoading, error };
};

export const usePost = (id: string) => {
  const [data, setData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getPost(id);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { data, isLoading, error };
};
