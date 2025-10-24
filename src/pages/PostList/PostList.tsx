import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Category, Post } from '../../types/post';

import { getMockPosts } from '../../api/posts';
import {
  Button,
  Container,
  EmptyText,
  ErrorText,
  FilterSection,
  Header,
  LoadingText,
  PaginationContainer,
  PostBody,
  PostCard,
  PostCategory,
  PostListContainer,
  PostMeta,
  PostTag,
  PostTitle,
  SearchInput,
  Select,
  TagContainer,
  Title,
} from './PostList.styles';

const PostList = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [category, setCategory] = useState<Category | ''>('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'title'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchMockPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getMockPosts(300);
        setAllPosts(response.items);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockPosts();
  }, []);

  useEffect(() => {
    let result = [...allPosts];

    // Filter by category
    if (category) {
      result = result.filter((post) => post.category === category);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.body.toLowerCase().includes(query),
      );
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setFilteredPosts(result);
    setCurrentPage(0);
  }, [allPosts, category, searchQuery, sortBy, sortOrder]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setSearchQuery(search);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as Category | '';
    setCategory(selectedCategory);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sort, order] = e.target.value.split('-') as [
      'createdAt' | 'title',
      'asc' | 'desc',
    ];
    setSortBy(sort);
    setSortOrder(order);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const paginatedPosts = filteredPosts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );
  const hasNextPage = (currentPage + 1) * itemsPerPage < filteredPosts.length;
  const hasPrevPage = currentPage > 0;

  if (isLoading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <ErrorText>Error loading posts</ErrorText>;

  return (
    <Container>
      <Header>
        <Title>Posts</Title>
        <Button onClick={() => navigate('/posts/new')}>New Post</Button>
      </Header>

      <FilterSection>
        <form onSubmit={handleSearch}>
          <SearchInput
            type="text"
            name="search"
            placeholder="Search posts..."
            defaultValue={searchQuery}
          />
          <Button type="submit">Search</Button>
        </form>

        <Select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="NOTICE">Notice</option>
          <option value="QNA">Q&A</option>
          <option value="FREE">Free</option>
        </Select>

        <Select value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
          <option value="createdAt-desc">Latest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </Select>
      </FilterSection>

      <PostListContainer>
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
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
        <Button onClick={handlePrevPage} disabled={!hasPrevPage}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={!hasNextPage}>
          Next
        </Button>
      </PaginationContainer>
    </Container>
  );
};

export default PostList;
