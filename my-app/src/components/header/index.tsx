import React, { useContext } from "react";
import Logo from "@components/svgs/logo";
import ShoppingCartButton from '@components/shoppingCartButton'
interface HeaderProps {
  // Add any props you need to pass to the Header component
}

export default function Header({}: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 w-full bg-white h-[70px] px-[120px] py-auto flex justify-between items-center shadow-md z-50">
      <div className="text-xl font-bold">
        <Logo />
      </div>

     <ShoppingCartButton/>
    </div>
  );
}
