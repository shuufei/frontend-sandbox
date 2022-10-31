import { Suspense } from 'react';
import AddTodo from './add-todo';
import { Todo, data } from './data';

async function getTodoList() {
  const res = await fetch('http://localhost:3000/api/todo');
  const data: { todoList: Todo[] } = await res.json();
  console.log('--- todo list: ', data);
  return data.todoList;
}

export default async function Page() {
  const todoList = await getTodoList();
  const id = Math.random();
  return (
    <>
      <AddTodo id={id} title={`todo-${id}`} />
      <ul>
        {todoList.map((todo) => (
          <p key={todo.id}>
            {todo.title}: {todo.completed ? 'done' : 'undone'}
          </p>
        ))}
      </ul>
    </>
  );
}
