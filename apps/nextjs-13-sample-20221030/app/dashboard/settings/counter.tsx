'use client'
import { FC, useState } from 'react';
import { NavBar } from './nav-bar';

export const Counter: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <p>{count}</p>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          increment
        </button>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          decrement
        </button>
      </div>
    </>
  );
};


