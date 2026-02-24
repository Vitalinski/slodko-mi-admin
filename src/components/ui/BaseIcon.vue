<script setup lang="ts">
import Close from "@/assets/icons/close.svg";

const icons = {
  close: Close,
} as const;

type IconName = keyof typeof icons;

const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: string;
    class?: string;
  }>(),
  {
    size: "100%",
    class: "",
  },
);
</script>

<template>
  <component
    :is="icons[props.name]"
    :class="props.class"
    :width="size"
    :height="size" />
</template>
