<script setup lang="ts">
const emit = defineEmits<{
    (e:"close"):void
}>()
</script>

<template>
     <button
        class="bg-accent absolute flex cursor-pointer items-center justify-center rounded-full
         text-white shadow-sm transition-all duration-200 hover:scale-115 hover:rotate-90 "
        @click="emit('close')"
      >
        <svg
          xmlns="/src/assets/icons/close.svg"
          class="size-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
</template>

<style scoped>

</style>