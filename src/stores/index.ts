import { defineStore } from "pinia";
import type {
  LoadProductsParams,
  Product,
  ProductFormData,
  ProductMap,
} from "@/types";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/api/products.api";
import { toFormData } from "axios";

export const useStore = defineStore("main", {
  state: (): {
    products: ProductMap;
    popularProducts: ProductMap;
    totalCount: number;
  } => ({
    products: {},
    popularProducts: {},
    totalCount: 0,
  }),

  getters: {},
  actions: {
    setProducts(products: Product[], totalCount: number) {
      const formattedProducts: ProductMap = {};
      for (let product of products) {
        formattedProducts[product.id] = product;
      }

      this.products = { ...this.products, ...formattedProducts };
      this.totalCount = totalCount;
    },

    async loadProducts(
      {
        categories,
        onlyPopular,
        searchValue,
        page,
        limit,
      }: LoadProductsParams = {
        categories: [],
        onlyPopular: false,
        searchValue: "",
      },
    ) {
      const { data } = await fetchProducts({
        categories,
        onlyPopular,
        searchValue,
        page,
        limit,
      });
      this.setProducts(data.products, data.totalCount);
    },

    async reset() {
      this.products = {};
    },
    async deleteProduct(productId: string) {
      await deleteProduct(productId);
      delete this.products[productId];
    },
    async updateProduct(product: Omit<Product, "category">, file?: File) {
      const formData = toFormData(product) as FormData;

      if (file) {
        formData.set("image", file);
      }
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const resp = await updateProduct(formData);
      this.products[product.id] = resp.data;
    },
    async createProduct(product: ProductFormData, file: File) {
      const formData = toFormData(product) as FormData;
      formData.set("image", file);
      await createProduct(formData);
    },
  },
});
