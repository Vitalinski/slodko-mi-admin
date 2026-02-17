<script setup lang="ts">
import { computed, watch } from "vue";
import ConfirmDelete from "../modalContent/ConfirmDelete.vue";

import ProductForm from "../modalContent/ProductForm.vue";
import { useModalStore } from "@/stores/modals.store";
import { storeToRefs } from "pinia";
import BaseContainer from "./BaseContainer.vue";
import BaseCloseButton from "./BaseCloseButton.vue";

const modalStore = useModalStore();

const { isModalOpen, type, payload } = storeToRefs(modalStore);
const modalComponent = computed(() => {
  switch (type?.value) {
    case "create":
      return ProductForm;
    case "edit":
      return ProductForm;
    case "delete":
      return ConfirmDelete;
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
    @click="closeModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <base-container
      @click.stop
      class="relative max-w-120 md:max-w-200 lg:max-w-5xl"
    >
      <base-close-button
        @close="closeModal"
        class="top-2 right-2 size-6 p-1 lg:top-4 lg:right-4 lg:size-9 lg:p-2"
      />
      <component :is="modalComponent" :payload="payload" @close="closeModal" />
    </base-container>
  </div>
</template>
