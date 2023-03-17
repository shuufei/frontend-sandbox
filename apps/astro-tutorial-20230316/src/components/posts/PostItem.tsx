import type { FC } from 'react';
import type { Post } from '../../server/get-posts';

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
