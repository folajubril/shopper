import React from 'react';
import Logo from '@components/svgs/logo'
import Image from 'next/image';

interface HeaderProps {
  // Add any props you need to pass to the Header component
}

export default function Header({}: HeaderProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full bg-white h-[70px] px-[120px] py-auto flex justify-between items-center shadow-md z-50"
    >
      <div className="text-xl font-bold">
        <Logo/>
      </div>

      <button
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l1.38-5H6.21M7 13l-2.82 8H19.42M7 13l1.38-5m8.62 0H7m5 0h5m-5 0L8.62 8" />
        </svg>
        Shopping Cart
      </button>
    </div>
  );
}