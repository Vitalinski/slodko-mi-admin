<script setup lang="ts">
import type { Category } from "@/types";
import { handleNumberInput } from "@/utils/inputNumberValidator";

const form = defineModel<Omit<Category, "id">>("form", {
  default: () => ({
    title: "",
    slug: "",
    order: 0,
    showInHeader: false,
  }),
});

function validateOrder(event: Event) {
  handleNumberInput(
    event,
    (num) => (form.value.order = num),
    (num) => Math.floor(num),
  );
}
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
      <label class="block text-sm font-medium mb-1">URL</label>
      <input
        v-model="form.slug"
        type="text"
        class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-black outline-none transition"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Order</label>
        <input
          :value="form.order"
          class="w-full rounded-lg border px-4 py-2"
          @input="validateOrder"
        />
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <input v-model="form.showInHeader" type="checkbox" class="w-4 h-4" />
      <span class="text-sm font-medium">Show in header</span>
    </div>
  </div>
</template>
