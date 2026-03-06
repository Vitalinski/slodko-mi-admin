<script setup lang="ts">
import type { Product } from "@/types";
import { useStore } from "@/stores";
import BaseButton from "../ui/BaseButton.vue";
import { ref } from "vue";
import BaseLoader from "../ui/BaseLoader.vue";

const props = defineProps<{
  payload: Product;
}>();

const emit = defineEmits(["close"]);
const store = useStore();
const deleteProduct = store.deleteProduct;

const isLoading = ref(false);

async function deleteItem() {
  isLoading.value = true;
  await deleteProduct(props.payload.id);
  emit("close");
  isLoading.value = false;
}
</script>

<template>
  <div>
    Please confirm you want to delete a
    <span class="text-accent-dark font-bold">{{ payload.title }}</span>
  </div>
  <div class="flex gap-4 pt-4">
    <base-button
      appearance="secondary"
      class="w-1/2"
      text="Cancel"
      @click="emit('close')"
    />

    <base-button class="w-1/2" @click="deleteItem">
      <base-loader v-if="isLoading" />
      <span v-else>Delete</span>
    </base-button>
  </div>
</template>
