export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    console.log(env.DB);
    if (pathname === '/api/users') {
      console.log('--- global: ', Object.keys(global), env);
      const { results } = await env.DB.prepare(
        'SELECT * FROM Users WHERE age > ?'
      )
        .bind(10)
        .all();
      return Response.json(results);
    }
    // …
    return new Response('Call /api/users to display users over 30 years old');
  },
};
