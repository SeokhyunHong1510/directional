import styled from 'styled-components';

import type { Category } from '../../types/post';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

export const Content = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2.5rem;
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

export const CategoryBadge = styled.span<{ category: Category }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${(props) => getCategoryColor(props.category)};
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
`;

export const Meta = styled.div`
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const Tag = styled.span`
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const Body = styled.div`
  color: #333;
  font-size: 1.1rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.25rem;
  color: #666;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 3rem;
  font-size: 1.25rem;
  color: #dc3545;
`;
