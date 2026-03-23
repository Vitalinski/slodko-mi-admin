<script setup lang="ts">
import BaseButton from "../ui/BaseButton.vue";
import { ref } from "vue";
import BaseLoader from "../ui/BaseLoader.vue";
import type { deletePayload } from "@/types/modals.types";

const props = defineProps<{
  payload: deletePayload;
}>();

const emit = defineEmits(["close"]);

const isLoading = ref(false);

async function deleteItem() {
  isLoading.value = true;
  await props.payload.onConfirm();
  isLoading.value = false;
  emit("close");
}
</script>

<template>
  <div>
    {{ props.payload.title }}
    <p class="italic">{{ props.payload.message }}</p>
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
