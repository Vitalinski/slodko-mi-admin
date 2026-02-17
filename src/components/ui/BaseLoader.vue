<script setup lang="ts">
import { computed } from 'vue'

type LoaderSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    size?: LoaderSize
    px?: number
    color?: string
  }>(),
  {
    size: 'md',
    color: 'currentColor',
  },
)

const sizeMap: Record<LoaderSize, number> = {
  sm: 16,
  md: 24,
  lg: 40,
}

const loaderSize = computed(() => {
  return props.px ?? sizeMap[props.size]
})
</script>

<template>
  <div class="size-full flex justify-center items-center self-center">
  <svg
    class="animate-spin"
    :width="loaderSize"
    :height="loaderSize"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
  </div>
</template>
