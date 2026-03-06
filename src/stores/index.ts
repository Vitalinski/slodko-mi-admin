import { defineStore } from "pinia";
import type {
  LoadProductsParams,
  Product,
  ProductBaseData,
  ProductMap,
} from "@/types";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "@/api/products.api";
import { toFormData } from "@/utils/formData";

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
      for (const product of products) {
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
    async updateProduct(product: Omit<Product, "category">) {
      const formData = toFormData (product) as FormData;

      const resp = await updateProduct(formData);
      this.products[product.id] = resp.data;
    },
    async createProduct(product: ProductBaseData) {
      const formData = toFormData(product) as FormData;
      await createProduct(formData);
    },
  },
});
