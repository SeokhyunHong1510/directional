import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Category, GetPostsParams } from '../../types/post';
import { usePosts } from '../../hooks/usePosts';

import {
  Container,
  Header,
  Title,
  Button,
  FilterSection,
  SearchInput,
  Select,
  PostListContainer,
  PostCard,
  PostTitle,
  PostBody,
  PostMeta,
  PostCategory,
  PostTag,
  TagContainer,
  PaginationContainer,
  LoadingText,
  ErrorText,
  EmptyText,
} from './PostList.styles';

const PostList = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<GetPostsParams>({
    limit: 10,
    sort: 'createdAt',
    order: 'desc',
  });

  const { data, isLoading, error } = usePosts(params);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setParams((prev) => ({ ...prev, search, nextCursor: undefined }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as Category | '';
    setParams((prev) => ({
      ...prev,
      category: category || undefined,
      nextCursor: undefined,
    }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split('-') as [
      'createdAt' | 'title',
      'asc' | 'desc',
    ];
    setParams((prev) => ({ ...prev, sort, order, nextCursor: undefined }));
  };

  const handleNextPage = () => {
    if (data?.nextCursor) {
      setParams((prev) => ({
        ...prev,
        nextCursor: data.nextCursor,
        prevCursor: undefined,
      }));
    }
  };

  const handlePrevPage = () => {
    if (data?.prevCursor) {
      setParams((prev) => ({
        ...prev,
        prevCursor: data.prevCursor,
        nextCursor: undefined,
      }));
    }
  };

  if (isLoading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <ErrorText>Error loading posts</ErrorText>;

  return (
    <Container>
      <Header>
        <Title>My Posts</Title>
        <Button onClick={() => navigate('/posts/new')}>New Post</Button>
      </Header>

      <FilterSection>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            name="search"
            placeholder="Search posts..."
          />
          <Button type="submit">Search</Button>
        </form>

        <Select value={params.category || ''} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="NOTICE">Notice</option>
          <option value="QNA">Q&A</option>
          <option value="FREE">Free</option>
        </Select>

        <Select
          value={`${params.sort}-${params.order}`}
          onChange={handleSortChange}
        >
          <option value="createdAt-desc">Latest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </Select>
      </FilterSection>

      <PostListContainer>
        {data?.items && data.items.length > 0 ? (
          data.items.map((post) => (
            <PostCard
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <PostCategory category={post.category}>
                {post.category}
              </PostCategory>
              <PostTitle>{post.title}</PostTitle>
              <PostBody>{post.body}</PostBody>
              {post.tags.length > 0 && (
                <TagContainer>
                  {post.tags.map((tag) => (
                    <PostTag key={tag}>{tag}</PostTag>
                  ))}
                </TagContainer>
              )}
              <PostMeta>{new Date(post.createdAt).toLocaleString()}</PostMeta>
            </PostCard>
          ))
        ) : (
          <EmptyText>No posts found</EmptyText>
        )}
      </PostListContainer>

      <PaginationContainer>
        <Button onClick={handlePrevPage} disabled={!data?.prevCursor}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={!data?.nextCursor}>
          Next
        </Button>
      </PaginationContainer>
    </Container>
  );
};

export default PostList;
