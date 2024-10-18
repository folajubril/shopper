/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ProductContext } from "@utils/context";

export default function ProductCardList({ products }: any) {
  const router = useRouter();
  const { addCart, updateProductQuantity } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  // Handle increment
  const increment = () => {
    setQuantity(quantity + 1);
  };

  // Handle decrement, ensuring quantity doesn't go below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const showDetail = (id: any) => {
    router.push({
      pathname: "/product/detail",
      query: { id },
    });
  };

  return (
    <div className="p-6 flex flex-wrap justify-between items-center gap-[25px]">
      {products?.map((item: any) => (
        <div
          onClick={() => showDetail(item?.id)}
          className="cursor-pointer max-w-sm mx-auto w-[420px] bg-white rounded-lg shadow-md overflow-hidden hover:scale-110"
        >
          <Image
            className="w-full h-48 object-cover"
            src={item?.image}
            alt={item?.title}
            width={200}
            height={200}
          />

          <div className="p-4">
            <p className="text-sm text-gray-500 uppercase">{item?.category}</p>

            <h3 className="text-lg font-bold text-gray-800 mt-2">
              {item?.title}
            </h3>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="text-xl font-semibold text-blue-500 mt-2">
                  ${item?.price}
                </p>
                <p className="text-gray-500">Rating: {item?.rating.rate} / 5</p>
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
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => addCart()}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
