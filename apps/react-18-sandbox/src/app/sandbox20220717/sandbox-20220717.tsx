import { FC, Suspense, useState, useTransition } from 'react';
import { Counter } from '../components/counter';
import { FilterProduct } from './filter-products';

const loadData = (ms: number, data: string) =>
  new Promise<string>((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, ms)
  );

let loadedData: string | null = null;

const getData = () => {
  if (loadedData) {
    return loadedData;
  } else {
    throw loadData(3000, `dummy content ${new Date().toISOString()}`).then(
      (data) => {
        console.log('--- get data: ', data);
        loadedData = data;
      }
    );
  }
};

function sleep(ms: number) {
  const startTime = performance.now();
  while (performance.now() - startTime < ms);
}

const Content: FC = () => {
  const data = getData();
  return (
    <section>
      <h3>Content</h3>
      <p>{data}</p>
    </section>
  );
};

export const Sandbox20220717: FC = () => {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(false);
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <h2>Sandbox 20220717</h2>
      <p>isPending: {String(isPending)}</p>
      <div>count: {count}</div>
      <Suspense fallback={<p>loading...</p>}>
        {showChild ? (
          <>
            <Content />
            <div>count: {count}</div>
            <button
              onClick={() => {
                setShowChild(false);
              }}
            >
              hide content
            </button>
          </>
        ) : (
          <>
            {/* <Counter /> */}
            <div>
              <button
                disabled={isPending}
                onClick={() => {
                  setCount(count + 1);
                  // sleep(1500);
                  // setShowChild(true);
                  startTransition(() => {
                    setShowChild(() => {
                      sleep(1500);
                      return true;
                    });
                  });
                }}
              >
                get content
              </button>
              <button
                onClick={() => {
                  setShowChild(false);
                }}
              >
                cencel
              </button>
            </div>
            <div>
              count: {count}
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
        )}
      </Suspense>

      <div>{/* <FilterProduct /> */}</div>
    </>
  );
};
