import type { Category } from "@/types";
import { api } from "./client";

export function fetchCategories() {
  try {
    return api.get("/categories");
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
}

export function createCategory(category: Omit<Category, "id">) {
  try {
    return api.post("/categories/create", category);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export function updateCategory(category: Category) {
  try {
    return api.put("/categories/update", category);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export function deleteCategory(categoryId: string) {
  return api.delete(`/categories/${categoryId}`);
}
