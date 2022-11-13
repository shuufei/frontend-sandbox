export type Post = {
  slug: string;
  title: string;
};

const POSTS: Post[] = [
  {
    slug: "my-first-post",
    title: "My First Post",
  },
  {
    slug: "90s-mixtape",
    title: "A Mixtape I Made Just For You",
  },
];

export async function getPosts(): Promise<Post[]> {
  return POSTS;
}

export async function getPost(slug: string) {
  return POSTS.find((v) => v.slug === slug);
}
