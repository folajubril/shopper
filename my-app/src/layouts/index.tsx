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
     
    </div>
  </div>
  );
};


export default Layout;