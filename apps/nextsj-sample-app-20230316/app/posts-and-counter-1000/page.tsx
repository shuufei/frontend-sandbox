import { FC } from 'react';
import { getPosts } from './get-posts';
import { Header } from './Header';
import { PostItem } from './PostItem';
import { Counter } from './Counter';

const PostPage = async () => {
  const posts = await getPosts();
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>posts</title>
      </head>
      <body>
        <Header title="posts" />
        <h2 style={{ fontSize: '12px' }}>Next.js: item count 1000</h2>
        <Counter defaultValue={10} />
        {posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </body>
    </html>
  );
};

export default PostPage;
