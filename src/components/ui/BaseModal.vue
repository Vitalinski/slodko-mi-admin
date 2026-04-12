<script setup lang="ts">
import { computed } from "vue";
import ConfirmDelete from "../modalContent/ConfirmDelete.vue";

import ProductForm from "../modalContent/productForm/ProductForm.vue";
import { useModalStore } from "@/stores/modals.store";
import { storeToRefs } from "pinia";
import BaseContainer from "./BaseContainer.vue";
import BaseCloseButton from "./BaseCloseButton.vue";
import CategoryForm from "../modalContent/categoryForm/CategoryForm.vue";
import OrderInfo from "../modalContent/OrderInfo.vue";

const modalStore = useModalStore();

const { isModalOpen, type, payload } = storeToRefs(modalStore);
const modalComponent = computed(() => {
  switch (type?.value) {
    case "productForm":
      return ProductForm;
    case "categoryForm":
      return CategoryForm;
    case "delete":
      return ConfirmDelete;
    case "orderInfo":
      return OrderInfo;

    default:
      return null;
  }
});
function closeModal() {
  modalStore.closeModal();
}
</script>

<template>
  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click="closeModal"
  >
    <base-container
      class="relative max-w-120 md:max-w-200 lg:max-w-5xl"
      @click.stop
    >
      <base-close-button
        class="top-2 right-2 size-6 p-1 lg:top-4 lg:right-4 lg:size-9 lg:p-1.5"
        @close="closeModal"
      />
      <component
        :is="modalComponent"
        :payload="payload as any"
        @close="closeModal"
      />
    </base-container>
  </div>
</template>
