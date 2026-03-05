<script setup lang="ts">
import { useCategoriesStore } from "@/stores/categories";
import type { ProductBaseData } from "@/types";
import { computed } from "vue";

const form = defineModel<ProductBaseData>("form", {
  default: () => ({
    title: "",
    description: "",
    price: 0,
    unit: "kg",
    minQuantity: 1,
    isPopular: false,
    categoryId: "",
    images: [],
  }),
});

const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;

const categoriesList = computed(() => Object.values(categories));
const priceDisplay = computed({
  get() {
    return form.value.price / 100;
  },
  set(value: number) {
    form.value.price = Math.round(value * 100);
  },
});
</script>

<template>
  <div class="space-y-5">
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black outline-none transition"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black outline-none resize-none transition"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Price</label>
        <input
          v-model.number="priceDisplay"
          type="number"
          step="0.01"
          min="0"
          class="w-full rounded-lg border px-4 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Min quantity</label>
        <input
          v-model.number="form.minQuantity"
          type="number"
          min="0"
          class="w-full rounded-lg border px-4 py-2"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Unit</label>
        <select v-model="form.unit" class="w-full rounded-lg border px-3 py-2">
          <option value="kg">kg</option>
          <option value="szt">szt</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Category</label>
        <select
          v-model="form.categoryId"
          class="w-full rounded-lg border px-3 py-2"
        >
          <option disabled value="">Select</option>
          <option
            v-for="category in categoriesList"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <input v-model="form.isPopular" type="checkbox" class="w-4 h-4" />
      <span class="text-sm font-medium">Popular product</span>
    </div>
  </div>
</template>
