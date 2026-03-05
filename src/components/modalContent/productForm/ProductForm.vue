<script setup lang="ts">
import { reactive, computed, ref, onBeforeMount } from "vue";
import type { Product } from "@/types";
import { useStore } from "@/stores";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseLoader from "@/components/ui/BaseLoader.vue";
import ProductImagesManager from "./components/ProductImagesManager.vue";
import ProductFormManager from "./components/ProductFormManager.vue";

const props = defineProps<{
  payload?: Product;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const store = useStore();

const isLoading = ref(false);

const form = reactive<Omit<Product, "category" | "id">>({
  title: "",
  description: "",
  price: 0,
  unit: "kg",
  minQuantity: 1,
  isPopular: false,
  categoryId: "",
  images: [],
});

const isChangesMade = computed(() => {
  if (!props.payload) return true;

  if (props.payload.images.length !== form.images.length) return true;

  const payloadImagesMap = new Map(
    props.payload.images.map((img) => [img.id, img]),
  );

  for (const image of form.images) {
    const matchingImage = payloadImagesMap.get(image.id);

    if (!matchingImage || matchingImage.url !== image.url) {
      return true;
    }
  }

  return (
    form.title !== props.payload.title ||
    form.description !== props.payload.description ||
    form.price !== props.payload.price ||
    form.unit !== props.payload.unit ||
    form.minQuantity !== props.payload.minQuantity ||
    form.isPopular !== props.payload.isPopular ||
    form.categoryId !== props.payload.categoryId
  );
});
const isEditMode = computed(() => Boolean(props.payload?.id));
const validImages = computed(() =>
  form.images.filter((img) => img.url || img.file),
);
const isFormValid = computed(() => {
  return (
    form.title.trim() !== "" &&
    form.description.trim() !== "" &&
    form.price > 0 &&
    form.minQuantity > 0 &&
    form.categoryId.trim() !== "" &&
    validImages.value.length > 0 &&
    form.images.length === validImages.value.length &&
    isChangesMade.value
  );
});

async function onSave() {
  if (!isFormValid.value) return;

  isLoading.value = true;
  const payload = { ...form };
  if (isEditMode.value && props.payload) {
    await store.updateProduct({ id: props.payload.id, ...payload });
  } else {
    await store.createProduct(payload);
  }

  isLoading.value = false;
  emit("close");
}

onBeforeMount(() => {
  if (!props.payload) {
    return;
  }
  console.log("Editing product:", props.payload);
  const product = props.payload;
  form.title = product.title;
  form.description = product.description;
  form.price = product.price;
  form.unit = product.unit;
  form.minQuantity = product.minQuantity;
  form.isPopular = product.isPopular;
  form.categoryId = product.categoryId;
  const arr = product.images.map((img) => ({
    id: img.id,
    url: img.url,
  }));
  form.images.push(...arr);
  console.log("Initial form images:", form.images);
});
</script>

<template>
  <form
    class="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl p-6 bg-white space-y-6"
    @submit.prevent="onSave"
  >
    <h2 class="text-xl font-semibold">
      {{ isEditMode ? "Edit product" : "Create product" }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      <ProductImagesManager
        v-model:images="form.images"
        :valid-images="validImages"
      />

      <ProductFormManager v-model:form="form" />
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
