import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Category } from '../../types/post';

import { createPost, getPost, updatePost } from '../../api/posts';
import {
  Button,
  CancelButton,
  Container,
  ErrorText,
  Form,
  Header,
  Input,
  Label,
  RemoveTagButton,
  Select,
  SubmitButton,
  Tag,
  TagInput,
  TagInputContainer,
  TagsContainer,
  TextArea,
  Title,
} from './PostCreate.styles';

const FORBIDDEN_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];

const PostCreate = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<Category>('FREE');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 인증 체크: 토큰이 없으면 메인으로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const checkForbiddenWords = (text: string): string | null => {
    const foundWord = FORBIDDEN_WORDS.find((word) => text.includes(word));
    return foundWord || null;
  };

  // 수정 모드일 때 게시글 데이터 불러오기
  useEffect(() => {
    if (isEditMode && id) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const post = await getPost(id);
          setTitle(post.title);
          setBody(post.body);
          setCategory(post.category);
          setTags(post.tags);
        } catch (err) {
          setError('Failed to load post. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [isEditMode, id]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) {
      return;
    }

    // 금지어 체크
    const forbiddenWord = checkForbiddenWords(trimmedTag);
    if (forbiddenWord) {
      setError(`Tag contains forbidden word: "${forbiddenWord}"`);
      return;
    }

    // 24자 이내 체크
    if (trimmedTag.length > 24) {
      setError('Tag must be 24 characters or less');
      return;
    }

    // 최대 5개 체크
    if (tags.length >= 5) {
      setError('Maximum 5 tags allowed');
      return;
    }

    // 중복 체크
    if (tags.includes(trimmedTag)) {
      setError('Duplicate tag');
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput('');
    setError('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    setError('');
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!body.trim()) {
      setError('Body is required');
      return;
    }

    // 금칙어 체크 - title
    const forbiddenWordInTitle = checkForbiddenWords(title);
    if (forbiddenWordInTitle) {
      setError(`금칙어가 포함되어 있습니다: "${forbiddenWordInTitle}"`);
      return;
    }

    // 금칙어 체크 - body
    const forbiddenWordInBody = checkForbiddenWords(body);
    if (forbiddenWordInBody) {
      setError(`금칙어가 포함되어 있습니다: "${forbiddenWordInBody}"`);
      return;
    }

    try {
      setIsSubmitting(true);
      if (isEditMode && id) {
        // 수정 모드
        await updatePost(id, {
          title: title.trim(),
          body: body.trim(),
          category,
          tags,
        });
      } else {
        // 생성 모드
        await createPost({
          title: title.trim(),
          body: body.trim(),
          category,
          tags,
        });
      }
      navigate('/posts');
    } catch (err) {
      setError(
        isEditMode
          ? 'Failed to update post. Please try again.'
          : 'Failed to create post. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Loading...</Title>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{isEditMode ? 'Edit Post' : 'Create New Post'}</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            disabled={isSubmitting}
          >
            <option value="NOTICE">Notice</option>
            <option value="QNA">Q&A</option>
            <option value="FREE">Free</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="body">Body *</Label>
          <TextArea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter post content"
            rows={10}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <Label htmlFor="tags">
            Tags (Max 5, 24 characters each, no duplicates)
          </Label>
          <TagInputContainer>
            <TagInput
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Enter tag and press Enter"
              disabled={isSubmitting || tags.length >= 5}
            />
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={isSubmitting || tags.length >= 5 || !tagInput.trim()}
            >
              Add Tag
            </Button>
          </TagInputContainer>

          {tags.length > 0 && (
            <TagsContainer>
              {tags.map((tag) => (
                <Tag key={tag}>
                  {tag}
                  <RemoveTagButton
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={isSubmitting}
                  >
                    ×
                  </RemoveTagButton>
                </Tag>
              ))}
            </TagsContainer>
          )}
        </div>

        {error && <ErrorText>{error}</ErrorText>}

        <div style={{ display: 'flex', gap: '10px' }}>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {(() => {
              if (isSubmitting) {
                return isEditMode ? 'Updating...' : 'Creating...';
              }
              return isEditMode ? 'Update Post' : 'Create Post';
            })()}
          </SubmitButton>
          <CancelButton
            type="button"
            onClick={() => navigate('/posts')}
            disabled={isSubmitting}
          >
            Cancel
          </CancelButton>
        </div>
      </Form>
    </Container>
  );
};

export default PostCreate;
