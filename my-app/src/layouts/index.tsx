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
    <div className="container mx-auto p-4">
      <Header />
      <main className="flex flex-col mx-auto my-[80px]">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2024 ShopPer. All rights reserved.</p>
      </footer>
    </div>
  </div>
  );
};


export default Layout;