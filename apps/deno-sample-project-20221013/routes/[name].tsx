import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Helper", "Hello");
    return resp;
  }
}

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
