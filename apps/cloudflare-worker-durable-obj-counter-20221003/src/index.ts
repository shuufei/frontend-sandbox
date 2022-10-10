/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;

  COUNTER: DurableObjectNamespace;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return await handleRequest(request, env);
  },
};

async function handleRequest(request: Request, env: Env) {
  const id = env.COUNTER.idFromName('A');
  const obje = env.COUNTER.get(id);
  const resp = await obje.fetch(request.url);
  const count = await resp.text();

  return new Response(`Durable Object 'A' count: ${count}`);
}

export class Counter {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    let value: number = (await this.state.storage.get('value')) || 0;
    switch (url.pathname) {
      case '/increment':
        ++value;
        break;
      case '/decrement':
        --value;
        break;
      case '':
        break;
      default:
        return new Response('Not found', { status: 404 });
    }

    await this.state.storage.put('value', value);
    return new Response(value.toString());
  }
}
