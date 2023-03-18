export type Post = {
  id: string;
  title: string;
  description: string;
};

const posts: Post[] = new Array(1000).fill(null).map((_, i) => {
  return {
    id: `id-${i}`,
    title: `title-${i}`,
    description: `descritpion ${i}`,
  };
});
export const getPosts = async () => {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve(posts);
    }, 0);
  });
};
