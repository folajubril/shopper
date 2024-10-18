import React, { useEffect, useState, useContext } from "react";
import Layout from "@/layouts";
import Head from "next/head";
import ProductCardList from "@components/card";
import SearchInput from "@components/searchInput";
import FilterTags from "@components/categoryTags";
import { ProductContext, productContextValue } from "@utils/context";

export default function Home() {
  const { products } = useContext(ProductContext);
const [productList, setProductList] = useState<any>(products)

const getFilteredProducts = (products: any) => {
  setProductList(products)
}

useEffect(() => {
  setProductList(products)
}, [productList])

  return (
    <ProductContext.Provider value={productContextValue}>
      <Layout>
        <Head>
          <title>Simple - Shopper</title>
          <meta name="description" content="Ecommerce application" />
        </Head>
        <div className="flex flex-col gap-[40px] mt-[80px] ">
          <SearchInput />
          <FilterTags getFilteredProducts={getFilteredProducts}/>
          {productList ? <ProductCardList products={productList} /> : <ProductCardList products={products} /> }
        </div>
      </Layout>
    </ProductContext.Provider>
  );
}
