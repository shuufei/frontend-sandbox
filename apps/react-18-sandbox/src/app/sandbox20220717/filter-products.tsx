import React, {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  useState,
  useTransition,
} from 'react';

export const generateProducts = () => {
  // NOTE: １万のダミーデータを作成
  const products = [];
  for (let i = 0; i < 3000; i++) {
    products.push(`Product ${i + 1}`);
  }
  return products;
};

const ProductList = ({ products }: { products: any[] }) => {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  );
};

// NOTE: １万のダミーデータを作成
const dummyProducts = generateProducts();

const filterProducts = (filterWord: string) => {
  // NOTE: 抽出キーワードがなければ、１万のデータを返す。
  if (!filterWord) {
    return dummyProducts;
  }
  // NOTE: 抽出キーワードでフィルタリングを行う。
  return dummyProducts.filter((product) => product.includes(filterWord));
};

export const FilterProduct = () => {
  const [isPending, startTransition] = useTransition();
  const [filterWord, setFilterWord] = useState('');

  // NOTE: 特定のワードをキーに、１万のダミーデータから対象データを抽出
  const filteredProducts = filterProducts(filterWord);

  const updateFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // NOTE: 状態（ステート）の更新を遅らせて、ユーザーのインプットの入出力を優先させる。（状態更新の優先順位低）
    // startTransition(() => {
    setFilterWord(event.target.value);
    // });
  };

  return (
    <div id="app">
      <h1>useTransition</h1>
      <input
        type="text"
        placeholder="数字を入力してください"
        onChange={updateFilterHandler}
      />
      <p>
        {/* NOTE: 状態（ステート）の更新を遅らせている間は、「isPending = true」となる。 */}
        {isPending && (
          <span style={{ color: 'white' }}>
            プロダクトをアップデート中・・・
          </span>
        )}
      </p>
      <ProductList products={filteredProducts} />
    </div>
  );
};
