import { useState, useDeferredValue, memo, Suspense } from 'react';
import { Counter } from './components/counter';

// https://qiita.com/uhyo/items/6be96c278c71b0ddb39b#usetransition
export const Example04 = () => {
  const [text, setText] = useState('');

  const deferredText = useDeferredValue(text);

  console.log(text, deferredText);

  return (
    <>
      <h1>04 Example of useDeferredValue</h1>
      <p>
        <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      </p>
      <p>{deferredText}</p>
    </>
  );
};

// https://qiita.com/uhyo/items/6be96c278c71b0ddb39b#usetransition
export const Example05 = () => {
  const [text, setText] = useState('');

  const deferredText = useDeferredValue(text);

  console.log(text, deferredText);

  return (
    <>
      <h1>05 Example of useDeferredValue 2</h1>
      <p>
        <input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      </p>
      <Show10000Times text={deferredText} />
    </>
  );
};

// https://qiita.com/uhyo/items/6be96c278c71b0ddb39b#usetransition
const Show10000Times: React.FC<{
  text: string;
}> = memo(({ text }) => (
  <p>
    {Array.from({ length: 100 }).map((_, i) => (
      <Show100Times text={text} />
    ))}
  </p>
));

// https://qiita.com/uhyo/items/6be96c278c71b0ddb39b#usetransition
const Show100Times: React.FC<{
  text: string;
}> = ({ text }) => (
  <>
    {Array.from({ length: 100 }).map((_, i) => (
      <span key={i}>{text}</span>
    ))}
  </>
);

export function App() {
  return (
    <main>
      <Suspense fallback={<p>loading...</p>}>
        <Counter />
      </Suspense>
      <Example04 />
      <Example05 />
    </main>
  );
}

export default App;
