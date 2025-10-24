import styled from 'styled-components';

import type { Category } from '../../types/post';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(Button)`
  background-color: #dc3545;

  &:hover:not(:disabled) {
    background-color: #c82333;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  form {
    display: flex;
    gap: 0.5rem;
    flex: 1;
    min-width: 300px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const PostCard = styled.div`
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const getCategoryColor = (category: Category) => {
  switch (category) {
    case 'NOTICE':
      return '#dc3545';
    case 'QNA':
      return '#28a745';
    case 'FREE':
      return '#007bff';
    default:
      return '#6c757d';
  }
};

export const PostCategory = styled.span<{ category: Category }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: ${(props) => getCategoryColor(props.category)};
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const IconButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
  }
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const PostBody = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const PostTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const PostMeta = styled.div`
  color: #999;
  font-size: 0.875rem;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #dc3545;
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #999;
`;
