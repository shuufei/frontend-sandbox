import { FC, useCallback, useState } from 'react';

export const SearchBox: FC = () => {
  const [value, setValue] = useState('');
  const executeSearch = useCallback(() => {
    location.href = `/posts?q=${value}`;
  }, [value]);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem 0',
      }}
    >
      <input type="text" onChange={(event) => setValue(event.target.value)} />
      <button onClick={executeSearch}>検索</button>
    </div>
  );
};
