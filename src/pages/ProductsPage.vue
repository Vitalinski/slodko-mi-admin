<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import { useStore } from "@/stores";
import { useCategoriesStore } from "@/stores/categories";
import { useModalStore } from "@/stores/modals.store";
import type { LoadProductsParams, Product } from "@/types";
import { formatMoney } from "@/utils/money";
import { onMounted, ref, useTemplateRef, computed, reactive } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import ProductsFilter from "@/components/productsPage/ProductsFilter.vue";

const PRODUCTS_PER_PAGE = 8;
const FIRST_PAGE_INDEX = 1;

const headers = [
  "Product",
  "Category",
  "Price",
  "Min Qty",
  "Popular",
  "Description",
  "Actions",
];

const store = useStore();
const categoriesStore = useCategoriesStore();
const modalStore = useModalStore();
const el = useTemplateRef("el");

const filter = reactive<LoadProductsParams>({
  searchValue: "",
  onlyPopular: false,
  categories: [],
});

const isLoading = ref(false);

const products = computed(() => Object.values(store.products));

async function loadNextPage() {
  if (isLoading.value) return;

  if (store.totalCount <= products.value.length) return;

  isLoading.value = true;
  await store.loadProducts({
    categories: filter.categories,
    onlyPopular: filter.onlyPopular,
    searchValue: filter.searchValue,
    page: products.value.length / PRODUCTS_PER_PAGE + FIRST_PAGE_INDEX,
  });

  isLoading.value = false;
}

function deleteProduct(product: Product) {
  modalStore.openModal("delete", product);
}

function openProductForm(product?: Product) {
  if (product) {
    modalStore.openModal("edit", product);
  } else {
    modalStore.openModal("create");
  }
}
async function onUpdateFilter(filterSettings: LoadProductsParams) {
  Object.assign(filter, filterSettings);
  isLoading.value = true;
  store.reset();
  await store.loadProducts({
    categories: filter.categories,
    searchValue: filter.searchValue,
    onlyPopular: filter.onlyPopular,
  });
  isLoading.value = false;
}

useInfiniteScroll(
  el,
  () => {
    loadNextPage();
  },
  {
    distance: 120,
    canLoadMore: () => store.totalCount > products.value.length,
  },
);

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([store.loadProducts(), categoriesStore.loadCategories()]);
  isLoading.value = false;
});
</script>

<template>
  <div class="p-8 space-y-12">
    <h3 class="text-center">Products Administration</h3>

    <section class="space-y-4 flex flex-col">
      <ProductsFilter @update-filter="onUpdateFilter" :isLoading :filter />
      <BaseTable>
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
            class="flex flex-col h-100 overflow-auto divide-y divide-gray-200"
            ref="el"
          >
            <tr
              v-for="product in products"
              :key="product.id"
              class="hover:bg-gray-50 hover:cursor-pointer items-center"
              @click="openProductForm(product)"
              style="
                display: grid;
                grid-template-columns: 232px 100px 100px 100px 100px auto 100px;
              "
            >
              <td class="px-4 py-3 flex items-center gap-3">
                <img
                  :src="`/images/${product.image}`"
                  class="w-10 h-10 rounded object-cover"
                />
                <span class="font-medium text-gray-900">{{
                  product.title
                }}</span>
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ product.category.title }}
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ formatMoney(product.price) }} / {{ product.unit }}
              </td>

              <td class="px-4 py-3 text-gray-700 text-center">
                {{ product.minQuantity }}
              </td>

              <td class="px-4 py-3 text-center">
                <span
                  v-if="product.isPopular"
                  class="inline-flex items-center justify-center text-green-600"
                  >★</span
                >
                <span v-else class="text-gray-800">—</span>
              </td>

              <td class="px-4 py-3">
                <div class="max-w-xs truncate text-gray-600">
                  {{ product.description }}
                </div>
              </td>

              <td class="px-4 py-3 space-x-3">
                <button
                  class="hover:cursor-pointer hover:scale-150 transition-transform"
                  @click="openProductForm(product)"
                >
                  ✏️
                </button>
                <button
                  class="hover:cursor-pointer hover:scale-150 transition-transform"
                  @click.stop="deleteProduct(product)"
                >
                  🗑️
                </button>
              </td>
            </tr>
            <BaseLoader v-if="isLoading" :class="{ 'h-8': products.length }" />
            <div v-else-if="!products.length" class="m-auto">
              <h3 class="text-center">No products</h3>
              <p class="text-xl">
                Try to change filter settings or reload the page
              </p>
            </div>
          </tbody>
        </template>
      </BaseTable>
      <BaseButton
        appearance="primary"
        text="Add new product"
        @click="openProductForm()"
      />
    </section>
  </div>
</template>
