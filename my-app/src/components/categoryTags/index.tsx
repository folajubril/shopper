import React, { useState, useEffect, useContext } from "react";
import useGetAllProductsCategories from "@/hooks/queries/product/useGetCategories";
// import { ProductContext } from "@utils/context";
import useGetProductsByCategory from "@/hooks/queries/product/useGetProductByCategory";

const FilterTags = ({ ...args }) => {
  const { getFilteredProducts, products } = args;
  const { data: categories } = useGetAllProductsCategories();
  // const { getProductByCategory } = useContext(ProductContext);
console.log(categories)



  const [filterd, setFilterd] = useState({
    filter: null,
    status: false,
    id: 0,
  });
  let cat = filterd?.filter ? filterd?.filter : "";
  const searchProductByCategory = async (productName: any) => {
    console.log(productName.toLowerCase());
    if (productName.toLowerCase().length > 0) {
      const searched = products?.filter((product: any) => {
        return (product = product?.category
          .toLowerCase()
          .includes(productName.toLowerCase()));
      });
      getFilteredProducts(searched);
    } else if (productName.toLowerCase().length <= 0) {
      return products;
    }
  };
  const { data: productsInCategory } = useGetProductsByCategory(cat);
console.log({productsInCategory})
  useEffect(() => {
    searchProductByCategory(cat)
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
    </div>
  );
};

export default FilterTags;
