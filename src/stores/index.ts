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
  fetchPopularProducts,
  fetchProducts,
  updateProduct,
} from "@/api/products.api";

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
    setProducts(products: Product[], totalCount: number, forPopular?: boolean) {
      const formattedProducts: ProductMap = {};
      for (let product of products) {
        formattedProducts[product.id] = product;
      }
      if (forPopular) {
        this.popularProducts = formattedProducts;
      } else {
        this.products = { ...this.products, ...formattedProducts };
        this.totalCount = totalCount;
      }
    },

    async loadProducts({ category, page, limit }: LoadProductsParams = {}) {
      const { data } = await fetchProducts({ category, page, limit });
      this.setProducts(data.products, data.totalCount);
    },

    async loadPopularProducts() {
      const { data } = await fetchPopularProducts();
      this.setProducts(data, 0, true);
    },

    async reset() {
      this.products = {};
      await this.loadProducts();
    },
    async deleteProduct(productId: string) {
      await deleteProduct(productId);
      delete this.products[productId];
    },
    async updateProduct(product: Product) {
      const resp = await updateProduct(product);
      this.products[product.id] = resp.data;
    },
    async createProduct(product: ProductFormData) {
      await createProduct(product);
    },
  },
});
