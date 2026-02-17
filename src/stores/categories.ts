import { fetchCategories, fetchHeaderCategories } from '@/api/categories.api'
import type { Category } from '@/types';
import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: (): { headerCategories: Category[]; categories: Record<string, Category> } => ({
    headerCategories: [],
    categories: {},
  }),

  actions: {
    async loadHeaderCategories() {
      const { data } = await fetchHeaderCategories()
      this.headerCategories = data
    },
    async loadCategories() {
      const { data } = await fetchCategories()
      for (let category of data) {
        this.categories[category.slug] = category
  
      }
    },
    findCategoryBySlug(slug: string) {
      return this.categories[slug]
    },
  },
})
