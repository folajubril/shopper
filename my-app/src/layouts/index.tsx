import React from "react";
import Header from "@components/header";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'], 
});

interface Props {
    children: React.ReactNode;
  }

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={poppins.className}>
    <div className="container mx-auto p-4 flex flex-col">
      <Header />
      <main className="flex flex-col my-[80px]">{children}</main>
      <div className="bg-gray-800 text-white text-center py-4 flex h-[100px] items-center justify-center bottom-0 fixed z-50">
        <p>&copy; 2024 ShopPer. All rights reserved.</p>
      </div>
    </div>
  </div>
  );
};


export default Layout;