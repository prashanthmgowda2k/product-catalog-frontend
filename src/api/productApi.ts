import axiosClient from "./axiosClient"
import { PageResponse, Product } from "../models/product";

export const getAllProducts = async () => {
  const response = await axiosClient.get<PageResponse<Product>>("/products");
  return response.data;
};
