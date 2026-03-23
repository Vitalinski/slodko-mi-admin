<script setup lang="ts">
import { reactive, computed, ref, onBeforeMount } from "vue";
import type { Category } from "@/types";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import { useCategoriesStore } from "@/stores/categories";
import CategoryFormManager from "./components/CategoryFormManager.vue";

const props = defineProps<{
  payload?: Category;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const categoryStore = useCategoriesStore();

const isLoading = ref(false);

const form = reactive<Omit<Category, "id" | "products">>({
  title: "",
  order: 0,
  showInHeader: false,
  slug: "",
});

const isChangesMade = computed(() => {
  if (!props.payload) return true;

  return (
    form.title !== props.payload.title ||
    form.order !== props.payload.order ||
    form.showInHeader !== props.payload.showInHeader ||
    form.slug !== props.payload.slug
  );
});

const isEditMode = computed(() => Boolean(props.payload?.id));

const isFormValid = computed(() => {
  return (
    form.title.trim() !== "" && form.slug.trim() !== "" && isChangesMade.value
  );
});

async function onSave() {
  if (!isFormValid.value) return;

  isLoading.value = true;
  const payload = { ...form };
  if (isEditMode.value && props.payload) {
    await categoryStore.updateCategory({ id: props.payload.id, ...payload });
  } else {
    await categoryStore.createCategory(payload);
  }

  isLoading.value = false;
  emit("close");
}

onBeforeMount(() => {
  if (!props.payload) {
    return;
  }
  const product = props.payload;
  form.title = product.title;
  form.order = product.order;
  form.showInHeader = product.showInHeader;
  form.slug = product.slug;
});
</script>

<template>
  <form
    class="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl p-6 bg-white space-y-6"
    @submit.prevent="onSave"
  >
    <h2 class="text-xl font-semibold">
      {{ isEditMode ? "Edit category" : "Create category" }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      <CategoryFormManager v-model:form="form" />
    </div>

    <div class="pt-4">
      <BaseButton
        class="w-full"
        type="submit"
        :disabled="!isFormValid || isLoading"
      >
        <BaseLoader v-if="isLoading" />
        <p v-else>
          {{ props?.payload ? "Save" : "Create" }}
        </p>
      </BaseButton>
    </div>
  </form>
</template>
