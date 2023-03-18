import { Post } from './get-posts';

export const deletePost = async (id: Post['id']) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(`--- delete: ${id}`);
      resolve();
    }, 500);
  });
};
