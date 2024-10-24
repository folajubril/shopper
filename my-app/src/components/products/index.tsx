import React, { useEffect, useState, useContext } from "react";
import PaginatedProductPage from "@/components/paginatedProductPage";

export default function Products() {

  return (
    <div className="flex flex-col gap-[40px] mt-[80px] w-full">
      <PaginatedProductPage itemsPerPage={10} />
    </div>
  );
}
