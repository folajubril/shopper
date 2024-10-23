import React, { useState, useEffect, useContext } from "react";
import useGetAllProductsCategories from "@/hooks/queries/product/useGetCategories";
import useGetProductsByCategory from "@/hooks/queries/product/useGetProductByCategory";

const FilterTags = ({ ...args }) => {
  const { getFilteredProducts, products } = args;
  const { data: categories } = useGetAllProductsCategories();

  const [filterd, setFilterd] = useState({
    filter: null,
    status: false,
    id: 0,
  });
  let cat = filterd?.filter ? filterd?.filter : "";
  const searchProductByCategory = async (categoryName: any) => {
    if (categoryName.toLowerCase().length > 0) {
      const searched = products?.filter((product: any) => {
        return (product =
          product?.category.toLowerCase() === categoryName.toLowerCase());
      });
      getFilteredProducts(searched);
    } else if (categoryName.toLowerCase().length <= 0) {
      return products;
    }
  };

  const clearFilters = async () =>  {
    await setFilterd({
      filter: null,
      status: false,
      id: 0,
    });
    getFilteredProducts(products)
  }
  const { data: productsInCategory } = useGetProductsByCategory(cat);
  useEffect(() => {
    searchProductByCategory(cat);
  }, [cat]);
  return (
    <div className="flex space-x-2">
      {categories?.map((filter: any, index: any) => (
        <div className="flex justify-between gap-[16px]">
          <div
            key={index + 1}
            onClick={async () => {
              await setFilterd({
                filter: filter,
                status: true,
                id: index + 1,
              });
            }}
            className={`flex items-center bg-gray-100 text-gray-400 px-3 py-1 rounded-full cursor-pointer  `}
          >
            <span
              className={`${
                filterd?.id == index + 1 && filterd?.status === true
                  ? "scale-110 bg-grey-300 text-gray-600 "
                  : ""
              }`}
            >
              {filter}
            </span>
          </div>
        </div>
      ))}
      {filterd.filter ? (
        <div
          onClick={() => clearFilters()
          }
          className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full cursor-pointer text-[16px]"
        >
          X
        </div>
      ) : ''}
    </div>
  );
};

export default FilterTags;
