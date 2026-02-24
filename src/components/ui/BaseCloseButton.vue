<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <button
    class="bg-accent absolute flex cursor-pointer items-center justify-center rounded-full text-white shadow-sm transition-all duration-200 hover:scale-115 hover:rotate-90"
    @click="emit('close')"
  >
    <BaseIcon name="close"></BaseIcon>
  </button>
</template>
