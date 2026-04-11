<script setup>
import { onMounted } from "vue";
import TheHeader from "./TheHeader.vue";
import { useOrdersStore } from "@/stores/orders";

const ordersStore = useOrdersStore();

onMounted(() => ordersStore.loadNewOrdersCount());
</script>
<template>
  <div class="relative flex min-h-screen flex-col">
    <the-header />
    <main class="flex-1 w-full max-w-300 mx-auto">
      <router-view />
    </main>
  </div>
</template>
