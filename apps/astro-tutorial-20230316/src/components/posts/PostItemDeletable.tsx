import { FC, useCallback } from 'react';
import type { Post } from '../../server/get-posts';
import { deletePost as deletePostServer } from '../../server/delete-post';

export const PostItem: FC<{ post: Post }> = ({ post }) => {
  const deletePost = useCallback((id: Post['id']) => {
    deletePostServer(id);
  }, []);
  return (
    <div
      style={{
        padding: '8px 12px',
        border: '1px solid #101010',
      }}
    >
      <p>{post.title}</p>
      <p>{post.description}</p>
      <button onClick={() => deletePost(post.id)}>delete</button>
    </div>
  );
};
