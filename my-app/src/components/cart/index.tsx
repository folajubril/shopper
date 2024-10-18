
import React, { useState } from 'react';

const Cart = ({ cartItems }: any) => {
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {/* Shopping Cart Items */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {cartItems.map((item: any, index: any) => (
          <div key={index} className="flex items-center mb-6 border-b pb-4">
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover mr-4"
            />
            
            {/* Product Details */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>

            {/* Subtotal */}
            <div className="text-lg font-semibold">
              ${item.price * item.quantity}
            </div>
          </div>
        ))}

        {/* Total Price */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <h2 className="text-2xl font-semibold">Total Price</h2>
          <p className="text-2xl font-bold text-blue-500">${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
        Proceed to Checkout
      </button>
    </div>
  );
};

// Sample cart items
const cartItems = [
  {
    image: 'https://via.placeholder.com/100',
    title: 'Stylish Backpack',
    price: 59.99,
    quantity: 2,
  },
  {
    image: 'https://via.placeholder.com/100',
    title: 'Running Shoes',
    price: 89.99,
    quantity: 1,
  },
  {
    image: 'https://via.placeholder.com/100',
    title: 'Wireless Headphones',
    price: 120.0,
    quantity: 1,
  },
];

export default function CartPage() {
  return <Cart cartItems={cartItems} />;
}
