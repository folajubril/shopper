/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

// import { paths } from '@src/types/api/terminal';
import axiosApi from '@services/axiosApi';

type Response = {
  statusCode: string;
  message: string;
  data: Array<any>;
};

export const QUERY_GET_ALL_MERCHANTS = 'Get all Merchants';

const getAllProducts =() => {
  const response = axiosApi.get('https://fakestoreapi.com/products');
  return response;
};

const useGetProducts = () => {
  const { data, ...queryDProps } = useQuery<
    AxiosResponse<Response>,
    AxiosError
  >([QUERY_GET_ALL_MERCHANTS], () => getAllProducts(), {
    enabled: true,
    refetchOnWindowFocus: false,
  });
  return { data: data?.data, ...queryDProps };
};

export default useGetProducts;
