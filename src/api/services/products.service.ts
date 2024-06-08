import { Product, ProductPaginationResponse } from "../../types";
import axiosInstance from "../axios";

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<ProductPaginationResponse>(
      `products?_page=${pageParam + 1}&_per_page=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<Product>(`products/${id}`)).data;
};
