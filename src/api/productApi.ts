import axiosClient from "./axiosClient"
import { PageResponse, Product } from "../models/product";

export const getAllProducts = async (params?: {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
}) => {
  const response = await axiosClient.get("/products", { params });
  return response.data;
};
