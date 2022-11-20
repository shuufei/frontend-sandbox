import { json, LoaderFunction } from '@remix-run/cloudflare';

declare const __D1_BETA__DB: D1Database;
// declare const env: {
//   DB: D1Database;
// };

export const loader: LoaderFunction = async ({ request, context }) => {
  console.log('--- called /api/db/folders');
  console.log('--- global: ', Object.keys(global));
  console.log('--- DB: ', __D1_BETA__DB, Object.keys(__D1_BETA__DB));
  const { results } = await __D1_BETA__DB
    .prepare('SELECT * FROM Users WHERE age > ?')
    .bind(10)
    .all();
  return json(results);
};
