import React, { useState, useEffect, useContext } from "react";
import useGetAllProductsCategories from "@/hooks/queries/product/useGetCategories";
import { ProductContext } from "@utils/context";
import useGetProductsByCategory from "@/hooks/queries/product/useGetProductByCategory";

const FilterTags = ({...args}) => {
  const {getFilteredProducts} = args;
  const { data: categories } = useGetAllProductsCategories();
  const { getProductByCategory } = useContext(ProductContext);

  const [filterd, setFilterd] = useState({ filter: null, status: false, id: 0 });
let cat = filterd?.filter ? filterd?.filter : '';
  const { data: productsInCategory } = useGetProductsByCategory(cat);
  getFilteredProducts(productsInCategory)
// useEffect(() => {
// }, [])
  return (
    <div className="flex space-x-2">
      {categories?.map((filter: any, index: any) => (
        <div className="flex justify-between gap-[16px]">
          <div
            key={index + 1}
            onClick={() => {
              getProductByCategory(filter)
              setFilterd({
                filter: filter, status: true, id : index+1
              })
            }}
            className={`flex items-center bg-gray-100 text-gray-400 px-3 py-1 rounded-full cursor-pointer  `}
          >
            <span
              className={`${
                filterd?.id == index+1 && filterd?.status === true
                  ? "scale-110 bg-grey-300 text-gray-600 "
                  : ""
              }`}
            >
              {filter}
            </span>
          </div>
          {/* {isActive[index +1]?.status == true  ? (
            <button
              onClick={() => {
                const filterToRemove = filters?.find(
                  (filt: any) => filter === filt
                );
                console.log({filterToRemove})
                setIsActive((prevFilter) => {
                  prevFilter && {
                    ...prevFilter,
                    filterToRemove,
                  };
                  return prevFilter ?? prevFilter
                });
              }}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              ✕
            </button>
          ) : ''} */}
        </div>
      ))}
    </div>
  );
};

export default FilterTags;
