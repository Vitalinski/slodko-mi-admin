import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "@/api/categories.api";
import type { Category } from "@/types";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: (): {
    categories: Record<string, Category>;
  } => ({
    categories: {},
  }),

  actions: {
    async loadCategories() {
      const { data } = await fetchCategories();
      for (const category of data) {
        this.categories[category.id] = category;
      }
    },
    async createCategory(category: Omit<Category, "id">) {
      const res = await createCategory(category);
      const newCategory = res.data.category;
      this.categories[newCategory.id] = newCategory;
    },
    async deleteCategory(id: string) {
      await deleteCategory(id);
      delete this.categories[id];
    },
    async updateCategory(category: Category) {
      await updateCategory(category);
      this.categories[category.id] = category;
    },
  },
})
