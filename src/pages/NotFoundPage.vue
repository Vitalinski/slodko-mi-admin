<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section
    class="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center"
  >
    <p class="text-accent text-[120px] md:text-[160px]">
      404
    </p>

    <h3>Nie znaleziono strony</h3>

    <p class="my-4 max-w-2xl">
      Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
    </p>

    <div class="mt-6">
      <BaseButton
        text="Wróć na stronę główną"
        link="/"
      />
    </div>
  </section>
</template>
