import React, { useEffect, useState, useContext } from "react";
import Layout from "@/layouts";
import Head from "next/head";
import ProductCardList from "@components/card";
import Spinner from "@components/spinner";
import SearchInput from "@components/searchInput";
import FilterTags from "@components/categoryTags";
import { ProductContext, productContextValue } from "@utils/context";
import useGetProducts from "@/hooks/queries/product/useGetProucts";

export default function Home() {
  const { data, isLoading } = useGetProducts();
  const [productList, setProductList] = useState<any>(data);
const getFilteredProducts = async (products: any) => {
    await setProductList(products);
  };

  useEffect(() => {
    setProductList(data);
  }, [data]);

  return (
    <ProductContext.Provider value={productContextValue}>
      <Layout>
        <Head>
          <title>Simple - Shopper</title>
          <meta name="description" content="Ecommerce application" />
        </Head>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-[40px] mt-[80px] w-full">
            <SearchInput search={getFilteredProducts} products={data} />
            <FilterTags getFilteredProducts={getFilteredProducts} products={data}/>
            <ProductCardList products={productList ?? productList} />
          </div>
        )}
      </Layout>
    </ProductContext.Provider>
  );
}
