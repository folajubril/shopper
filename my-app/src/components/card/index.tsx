/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ProductContext } from "@utils/context";
import useStore from "@/store";
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productTotal: number;
}

// Define the CartItem type
interface CartItem {
  products: Product[];
  grandTotal: number;
}
export default function ProductCardList({ products }: any) {
  const [cartItem, setCartItem] = useState<any>();

  const calculateGrandTotal = (products: any) => {
    return products.reduce(
      (acc: any, product: { productTotal: any }) => acc + product.productTotal,
      0
    );
  };

  const addToCart = (product: any) => {
    console.log({ product });
    setCartItem((prevCart: any | null) => {
      const newProduct = {
        products: [
          ...(prevCart?.products || []),
          {
            ...product,
            productTotal: product.price * product.quantity,
          },
        ],
        grandTotal: calculateGrandTotal([
          ...(prevCart?.products || []),
          {
            ...product,
            productTotal: product.price * product.quantity,
          },
        ]),
      };
      console.log({ newProduct }, { prevCart });
      return prevCart ? { ...prevCart?.products, newProduct } : [newProduct];
    });
  };
  const { setCart, cart } = useStore((state) => state);

  const router = useRouter();
  // const { addCart, cart } = useContext(ProductContext);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Handle increment
  const increment = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  // Handle decrement for a specific product, ensuring quantity doesn't go below 1
  const decrement = (id: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
    }));
  };
  console.log({ cart });
  const showDetail = (id: any) => {
    router.push({
      pathname: "/product/detail",
      query: { id },
    });
  };
  useEffect(() => {
    setCart(cartItem);
  }, [cartItem]);
  return (
    <div className="p-6 flex flex-wrap justify-between items-center gap-[25px]">
      {products?.map((item: any) => (
        <div className="cursor-pointer max-w-sm mx-auto w-[420px] h-[] bg-white rounded-lg shadow-md overflow-hidden hover:scale-110">
          <Image
            onClick={() => showDetail(item?.id)}
            className="w-full h-56 object-contain"
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
                  onClick={() => decrement(item.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  -
                </button>

                <span className="text-xl font-semibold">
                  {quantities[item.id] || 1}
                </span>

                <button
                  onClick={() => increment(item.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
              onClick={() => {
                console.log(
                  { ...item, quantity: quantities[item.id] || 1 },
                  "kskskkpoi"
                );
                addToCart({ ...item, quantity: quantities[item.id] || 1 });
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
