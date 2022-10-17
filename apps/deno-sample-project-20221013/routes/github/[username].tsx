import { Handlers, PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import Counter from "../../islands/Counter.tsx";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }
  const [count, setCount] = useState(0);
  return (
    <div>
      <img
        src={data.avatar_url}
        width={64}
        height={64}
        alt="github user avater image"
      />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        increment
      </button>
      <Counter start={0} />
    </div>
  );
}
