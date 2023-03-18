import type { FC } from 'react';
import React from 'react';
import type { Post } from './get-posts';

export const PostItem: FC<{ post: Post }> = ({ post }) => {
  return (
    <div
      style={{
        padding: '8px 12px',
        border: '1px solid #101010',
      }}
    >
      <p>{post.title}</p>
      <p>{post.description}</p>
    </div>
  );
};
