import React from "react";
import useStore from "@/store";
import { useRouter } from "next/router";

export default function ShoppingCartButton() {
  const { cart } = useStore((state) => state);
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push("/cart")}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l1.38-5H6.21M7 13l-2.82 8H19.42M7 13l1.38-5m8.62 0H7m5 0h5m-5 0L8.62 8"
          />
        </svg>
        {cart?.length > 0 ? Number(cart?.length) : "Shopping Cart"}
      </button>
    </div>
  );
}
