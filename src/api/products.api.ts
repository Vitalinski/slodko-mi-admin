import { api } from "./client";
import {
  type LoadProductsParams,
  type Product,
  type ProductFormData,
} from "@/types";

export function fetchProducts(
  params: LoadProductsParams = {
    categories: [],
    onlyPopular: false,
    searchValue: "",
  },
) {
  return api.get("/products", { params });
}

export function createProduct(product: ProductFormData) {
  try {
    return api.post("/products/create", product);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export function updateProduct(product: Product) {
  try {
    return api.put("/products/update", product);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
export function deleteProduct(productId: string) {
  return api.delete(`/products/${productId}`);
}
