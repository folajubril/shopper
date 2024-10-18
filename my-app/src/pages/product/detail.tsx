import React, { useState, useContext, useEffect } from "react";
import useGetProduct from "@/hooks/queries/product/useGetOneProduct";
import { useRouter } from "next/router";
import Layout from "@/layouts";
import Head from "next/head";
import { ProductContext } from "@utils/context";

const ProductDetail = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: productDetails } = useGetProduct(Number(id));
  let lll = productDetails?.data;

  const { addCart, updateProductQuantity, cart } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    updateProductQuantity(id, quantity);
  }, []);
  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Product Container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={lll?.image}
            alt={lll?.title}
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          {/* Title and Category */}
          <div>
            <p className="text-sm text-gray-500 uppercase">{lll?.category}</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">
              {lll?.title}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-4">
            <span className="text-yellow-400 text-xl">
              {"★".repeat(lll?.rating.rate)}{" "}
            </span>
            <span className="text-gray-500 ml-2">({lll?.rating.rate}/5)</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-4">{lll?.description}</p>

          {/* Price */}
          <div className="flex justify-between">
            <div className="mt-4 text-xl font-semibold text-blue-500">
              ${lll?.price}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                -
              </button>

              <span className="text-xl font-semibold">{quantity}</span>

              <button
                onClick={increment}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            onClick={(lll) => {
              addCart(lll)
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
