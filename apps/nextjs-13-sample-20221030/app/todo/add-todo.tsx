'use client';

import { useRouter } from 'next/navigation';
import { data } from './data';

async function update(
  id: number,
  title: string,
  completed: boolean,
  refresh: () => void
) {
  await fetch(`http://localhost:3000/api/todo`, {
    method: 'POST',
    body: JSON.stringify({ id, title, completed }),
  });
  // Refresh the current route and fetch new data from the server
  refresh();
}

export default function AddTodo({ id, title }: { id: number; title: string }) {
  const router = useRouter();

  return (
    <>
      <p>new todo title: {title}</p>
      <button
        onClick={() => {
          update(id, title, false, router.refresh);
        }}
      >
        add todo
      </button>
    </>
  );
}
