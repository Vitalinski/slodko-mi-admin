<script setup lang="ts">
defineProps<{
  gridTemplate?: string;
}>();
</script>

<template>
  <div class="overflow-auto rounded-lg border border-gray-200 bg-[#ffffff]">
    <table class="min-w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr
          class="items-center grid"
          :style="{ gridTemplateColumns: gridTemplate }"
        >
          <slot name="head" />
        </tr>
      </thead>

      <slot name="body" />
    </table>
  </div>
</template>