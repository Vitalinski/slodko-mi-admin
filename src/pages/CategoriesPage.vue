<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import { useCategoriesStore } from "@/stores/categories";
import { useModalStore } from "@/stores/modals.store";
import type { Category } from "@/types";
import { computed, onMounted, ref, useTemplateRef } from "vue";

const headers = ["Category", "URL(link)", "Order", "Show in header", "Actions"];

const categoriesStore = useCategoriesStore();

const modalStore = useModalStore();
const el = useTemplateRef("el");

const isLoading = ref(false);

const categories = computed(() => Object.values(categoriesStore.categories));

function openCategoryForm(category?: Category) {
  if (category) {
    modalStore.openModal("categoryForm", category);
  } else {
    modalStore.openModal("categoryForm");
  }
}

function deleteCategory(category: Category) {
  modalStore.openModal("delete", {
    title: `Delete category ${category.title}?`,
    message: "All products in this category will be deleted",
    onConfirm: () => categoriesStore.deleteCategory(category.id),
  });
}

onMounted(async () => {
  isLoading.value = true;
  await categoriesStore.loadCategories();
  isLoading.value = false;
});
</script>

<template>
  <div class="p-8 space-y-12">
    <h3 class="text-center">Categories Administration</h3>

    <section class="space-y-4 flex flex-col">
      <BaseTable grid-template="1fr 1fr 1fr 1fr 100px">
        <template #head>
          <th
            v-for="header in headers"
            :key="header"
            class="px-4 py-3 text-left font-medium"
          >
            {{ header }}
          </th>
        </template>

        <template #body>
          <tbody
            ref="el"
            class="flex flex-col h-100 overflow-auto divide-y divide-gray-200 min-w-125"
          >
            <tr
              v-for="category in categories"
              :key="category.id"
              class="hover:bg-gray-50 hover:cursor-pointer items-center grid grid-cols-[1fr_1fr_1fr_1fr_100px]"
              @click="openCategoryForm(category)"
            >
              <td class="px-4 py-3 text-gray-700">
                {{ category.title }}
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ category.slug }}
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ category.order }}
              </td>

              <td class="px-4 py-3">
                <span
                  v-if="category.showInHeader"
                  class="inline-flex items-center justify-center text-green-600"
                >★</span>
                <span v-else class="text-gray-800">—</span>
              </td>

              <td class="px-4 py-3 space-x-3">
                <button
                  class="hover:cursor-pointer hover:scale-150 transition-transform"
                  @click="openCategoryForm(category)"
                >
                  ✏️
                </button>
                <button
                  class="hover:cursor-pointer hover:scale-150 transition-transform"
                  @click.stop="deleteCategory(category)"
                >
                  🗑️
                </button>
              </td>
            </tr>
            <BaseLoader
              v-if="isLoading"
              :class="{ 'h-8': categories.length }"
            />
            <div v-else-if="!categories.length" class="m-auto">
              <h3 class="text-center">No categories</h3>
              <p class="text-xl">
                Try to create the category or reload the page
              </p>
            </div>
          </tbody>
        </template>
      </BaseTable>
      <BaseButton
        appearance="primary"
        text="Add new category"
        @click="openCategoryForm()"
      />
    </section>
  </div>
</template>
