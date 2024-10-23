import React, { useState, useContext } from "react";
import { ProductContext, productContextValue } from "@utils/context";
import Image from "next/image";
import Layout from "@/layouts";
import Head from "next/head";
import { useNavigate } from "react-router-dom";
import useStore from "@/store";
import { useRouter } from 'next/router'

const Cart = ({ cartItems }: any) => {
  // Calculate total price

  const router = useRouter()

  const totalPrice = cartItems?.reduce((acc: any, item: any) => acc + item.total, 0)
  
  const goBack = () => {
    router.back()
  };
  return (
    <div className="max-w-5xl p-6 w-full ">
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            {cartItems?.map((item: any) => (
              <div key={item.product.id} className="flex items-center mb-6 border-b pb-4 w-full" >
                <Image
                  src={item.product.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 object-contain mr-4"
                />

                {/* Product Details */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">
                    Price: ${item.product.price}
                  </p>
                  <p className="text-gray-500">Quantity: {item.product.quantity}</p>
                </div>

                {/* Subtotal */}
                <div className="text-lg font-semibold">
                  ${item.product.price * item.product.quantity}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <h2 className="text-2xl font-semibold">Total Price</h2>
              <p className="text-2xl font-bold text-blue-500">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => router.push('/checkout')} className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
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
  const { cart } = useStore((state) => state);
  return (
    <ProductContext.Provider value={productContextValue}>
      <Layout>
        <Head>
          <title>Cart / Simple - Shopper</title>
          <meta name="description" content="Ecommerce application" />
        </Head>
        <div className="flex mt-[100px] justify-center">
          <Cart cartItems={cart} />
        </div>
      </Layout>
    </ProductContext.Provider>
  );
}
