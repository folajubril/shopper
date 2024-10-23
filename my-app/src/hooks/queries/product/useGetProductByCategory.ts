/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import axiosApi from '@services/axiosApi';

type Response = {
  statusCode: string;
  message: string;
  data: any;
};

export const QUERY_GET_PRODUCT_BY_CATEGORY = 'Get product by category';

const getProduct =(
    category?: string,
) => {
  const response = axiosApi.get(`https://fakestoreapi.com/products/category/${category}`);
  return response;
};

const useGetProductsByCategory = (category? :string) => {
  const { data, ...queryDProps } = useQuery<
    AxiosResponse<any>,
    AxiosError
  >([QUERY_GET_PRODUCT_BY_CATEGORY, category], () => getProduct(category), {
    enabled: !!category,
    refetchOnWindowFocus: false,
  });
  return { data: data?.data, ...queryDProps };
};

export default useGetProductsByCategory;
