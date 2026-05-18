<script setup lang="ts">
import { computed, ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseContainer from "@/components/ui/BaseContainer.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const login = ref("");
const password = ref("");

const errorText = ref("");

const processLogin = () => {
  try {
    authStore.logIn(login.value, password.value);
  } catch (error) {
    console.error("Login failed:", error);
    errorText.value = "Nieprawidłowy login lub hasło.";
  }
};

const isBtnDisabled = computed(() => {
  return login.value.length < 3 || password.value.length < 3;
});
</script>

<template>
  <base-container class="max-w-xl overflow-auto">
    <form class="flex grow flex-col" @submit.prevent="processLogin">
      <div class="grow space-y-4">
        <h2 class="font-serif text-2xl">Logowanie administratora</h2>

        <div class="space-y-4">
          <input v-model="login" type="text" placeholder="Login" />
          <input v-model="password" type="password" placeholder="Hasło" />
        </div>
      </div>

      <div class="flex gap-4 pt-4">
        <base-button
          type="submit"
          class="w-full"
          text="Zaloguj się do systemu"
          :disabled="isBtnDisabled"
        />
      </div>
    </form>
  </base-container>
</template>

<style scoped></style>
