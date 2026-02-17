<script setup lang="ts">
import { useRouter } from 'vue-router'

interface BaseButtonProperties {
  appearance?: 'primary' | 'secondary'
  link?: string
  text?: string | number
  size?: 'sm' | 'md'
  disabled?: boolean
}
const props = withDefaults(defineProps<BaseButtonProperties>(), {
  appearance: 'primary',
  size: 'md',
})

const router = useRouter()

function onClick() {
  if (props.link) router.push(props.link)
}
</script>

<template>
  <button
    :class="['btn', `btn-${props.appearance}`, `btn-${props.size}`, { disabled }]"
    @click="onClick"
  >
    {{ props.text }}
    <slot></slot>
  </button>
</template>
