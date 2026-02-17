<script setup>
import TheHeader from "./TheHeader.vue";

</script>
<template>
  <div class="relative flex min-h-screen flex-col">
    <the-header />
    <main class="flex-1 w-full max-w-300 mx-auto">
      <router-view />
    </main>
  </div>
</template>
