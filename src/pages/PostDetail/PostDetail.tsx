import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import type { Post } from '../../types/post';

import { deletePost, getPost } from '../../api/posts';
import {
  BackButton,
  Body,
  ButtonGroup,
  CategoryBadge,
  Container,
  Content,
  DeleteButton,
  EditButton,
  ErrorText,
  Header,
  LoadingText,
  Meta,
  Tag,
  TagsContainer,
  Title,
} from './PostDetail.styles';

const PostDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const statePost = location.state?.post as Post | undefined;

  const [post, setPost] = useState<Post | null>(statePost || null);
  const [isLoading, setIsLoading] = useState(!statePost);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!statePost && id) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const fetchedPost = await getPost(id);
          setPost(fetchedPost);
        } catch (err) {
          setError('Failed to load post');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, statePost]);

  const getCurrentUserId = (): string | null => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded.userId || decoded.sub || decoded.id || null;
    } catch {
      return null;
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePost(id);
        alert('게시글이 삭제되었습니다.');
        navigate('/posts');
      } catch (err) {
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  if (isLoading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;
  if (!post) return <ErrorText>Post not found</ErrorText>;

  const currentUserId = getCurrentUserId();
  const isAuthor = currentUserId && post.userId === currentUserId;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/posts')}>
          ← Back to Posts
        </BackButton>
        {isAuthor && (
          <ButtonGroup>
            <EditButton onClick={() => navigate(`/posts/edit/${post.id}`)}>
              Edit
            </EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </ButtonGroup>
        )}
      </Header>

      <Content>
        <CategoryBadge category={post.category}>{post.category}</CategoryBadge>
        <Title>{post.title}</Title>
        <Meta>작성일: {new Date(post.createdAt).toLocaleString()}</Meta>

        {post.tags.length > 0 && (
          <TagsContainer>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
        )}

        <Body>{post.body}</Body>
      </Content>
    </Container>
  );
};

export default PostDetail;
