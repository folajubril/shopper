import React, { useState, useContext, useEffect } from "react";
import useGetProduct from "@/hooks/queries/product/useGetOneProduct";
import { useRouter } from "next/router";
import Layout from "@/layouts";
import Head from "next/head";
import { ProductContext } from "@utils/context";
import Image from "next/image";

const ProductDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: productDetails } = useGetProduct(Number(id));
  let product = productDetails?.data;

  const { addCart, updateProductQuantity, cart } = useContext(ProductContext);

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  
  const increment = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };
  const decrement = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));

  };
  const goBack = () => {
    router.back()
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div
        onClick={goBack}
        className="flex mb-[10px]items-center space-x-2 cursor-pointer border-gray rounded-md p-[6px]"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span className="text-gray-800">Back</span>
      </div>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2">
          <Image
            className="w-full h-full object-cover"
            src={product?.image}
            alt={product?.title}
            width={400}
            height={400}
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500 uppercase">
              {product?.category}
            </p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">
              {product?.title}
            </h1>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-yellow-400 text-xl">
              {"★".repeat(product?.rating.rate)}{" "}
            </span>
            <span className="text-gray-500 ml-2">
              ({product?.rating.rate}/5)
            </span>
          </div>

          <p className="text-gray-600 mt-4">{product?.description}</p>

          <div className="flex justify-between">
            <div className="mt-4 text-xl font-semibold text-blue-500">
              ${product?.price}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => decrement(product?.id)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                -
              </button>

              <span className="text-xl font-semibold">
                {" "}
                {quantities[product?.id] || 1}
              </span>

              <button
                onClick={() => increment(product?.id)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            onClick={() => {
              addCart({...product, quantity: quantities[product.id] || 1 });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductPage({ product }: any) {
  return (
    <Layout>
      <Head>
        <title>Simple - Shopper</title>
        <meta name="description" content="Ecommerce application" />
      </Head>
      <div className="mt-[80px]">
        <ProductDetail />
      </div>
    </Layout>
  );
}
