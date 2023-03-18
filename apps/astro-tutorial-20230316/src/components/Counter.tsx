import { FC, useState } from 'react';

export const Counter: FC<{ defaultValue: number }> = ({ defaultValue }) => {
  const [count, setCount] = useState(defaultValue);
  return (
    <div style={{ padding: '8px' }}>
      <p>{`count: ${count}`}</p>
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
  );
};
