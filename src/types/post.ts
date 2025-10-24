export type Category = 'NOTICE' | 'QNA' | 'FREE';

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  createdAt: string;
}

export interface MockPostsResponse {
  items: Post[];
  count: number;
}

export interface GetPostsParams {
  limit?: number;
  prevCursor?: string;
  nextCursor?: string;
  sort?: 'createdAt' | 'title';
  order?: 'asc' | 'desc';
  category?: Category;
  from?: string;
  to?: string;
  search?: string;
}

export interface GetPostsResponse {
  items: Post[];
  nextCursor?: string;
  prevCursor?: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  category: Category;
  tags?: string[];
}

export interface UpdatePostRequest {
  title?: string;
  body?: string;
  category?: Category;
  tags?: string[];
}
