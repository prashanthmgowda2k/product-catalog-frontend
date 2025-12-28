import axiosClient from "./axiosClient";
import { Category } from "../models/category";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get("/categories");
  return response.data;
};
