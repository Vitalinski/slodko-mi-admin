<script setup>
import TheHeader from "./TheHeader.vue";
import { computed } from "vue";
import router from "@/router";

const isLoginPage = computed(() => router.currentRoute.value.path === "/login");
</script>
<template>
  <div class="relative flex min-h-screen flex-col">
    <the-header v-if="!isLoginPage" />
    <main
      class="flex-1 w-full max-w-300 mx-auto"
      :class="{ 'flex justify-center items-center': isLoginPage }"
    >
      <router-view />
    </main>
  </div>
</template>
