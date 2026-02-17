<script setup lang="ts">
import type { Product } from "@/types";
import { useStore } from "@/stores";
import BaseButton from "../ui/BaseButton.vue";
const props = defineProps<{
  payload: Product;
}>();
const emit = defineEmits(["close"]);
const store = useStore();
const deleteProduct = store.deleteProduct;

async function deleteItem() {
  await deleteProduct(props.payload.id);
  emit("close");
}
</script>

<template>
  <div>
    Please confirm you want to delete a
    <span class="text-accent-dark font-bold">{{ payload.title }}</span>
  </div>
  <div class="flex gap-4 pt-4">
    <base-button appearance="secondary" class="w-1/2" text="Cancel" @click="emit('close')" />

    <base-button class="w-1/2" text="Delete" @click="deleteItem" />
  </div>
</template>
