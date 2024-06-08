import React, { Fragment, useState } from "react";
import { useProduct, useProducts } from "../api/queries/products.queries";

export const Products: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const productsQuery = useProducts();
  const productQuery = useProduct(selectedProductId);

  return (
    <>
      {productsQuery.data?.pages.map(({ data }) => (
        <Fragment key={data[0].id}>
          {data.map((product) => (
            <div key={product.id}>
              <div>{product.name}</div>
              <button onClick={() => setSelectedProductId(product.id)}>
                Select
              </button>
            </div>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button
          onClick={() => productsQuery.fetchNextPage()}
          disabled={
            !productsQuery.hasNextPage || productsQuery.isFetchingNextPage
          }
        >
          {productsQuery.isFetchingNextPage
            ? "Loading more..."
            : productsQuery.hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>Selected product:</div>
      {JSON.stringify(productQuery.data)}
    </>
  );
};
