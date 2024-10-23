import React, { useState, useContext } from "react";
import { ProductContext, productContextValue } from "@utils/context";
import Image from "next/image";
import Layout from "@/layouts";
import Head from "next/head";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";

const Cart = ({ cartItems }: any) => {
  // Calculate total price

  // const { setCart, cart } = useStore((state) => state);

  console.log({ cartItems });
  const totalPrice =
    cartItems ??
    cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <div className="max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div
        onClick={goBack}
        className="flex items-center space-x-2 cursor-pointer border-gray rounded-md p-[6px]"
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
      {cartItems.length ? (
        <>
          {" "}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cartItems.map((item: any, index: any) => (
              <div key={index} className="flex items-center mb-6 border-b pb-4">
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover mr-4"
                />

                {/* Product Details */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>

                {/* Subtotal */}
                <div className="text-lg font-semibold">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <h2 className="text-2xl font-semibold">Total Price</h2>
              <p className="text-2xl font-bold text-blue-500">${totalPrice}</p>
            </div>
          </div>
          <button className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </>
      ) : (
        <>
          <div className="flex w-full h-full items-center justify-center">
            No Items Selected
          </div>
        </>
      )}
    </div>
  );
};

export default function CartPage() {
  const { cart } = useContext(ProductContext);
  console.log({ cart }, "kksk");
  return (
    <ProductContext.Provider value={productContextValue}>
      <Layout>
        <Head>
          <title>Simple - Shopper</title>
          <meta name="description" content="Ecommerce application" />
        </Head>
        <div className="flex mt-[100px]">
          <Cart cartItems={cart} />
        </div>
      </Layout>
    </ProductContext.Provider>
  );
}
