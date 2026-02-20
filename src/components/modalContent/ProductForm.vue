<script setup lang="ts">
import { reactive, watch, computed, ref } from "vue";
import type { Product, Category } from "@/types";
import { useStore } from "@/stores";
import BaseButton from "../ui/BaseButton.vue";
import { useCategoriesStore } from "@/stores/categories";

const props = defineProps<{
  payload?: Product;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const store = useStore();
const categoriesStore = useCategoriesStore();
const categories = categoriesStore.categories;
const categoriesList = computed(() => Object.values(categories));
const isEditMode = computed(() => Boolean(props.payload?.id));

const isFormValid = computed(() => {
  return (
    form.title.trim() !== "" &&
    form.description.trim() !== "" &&
    form.price > 0 &&
    form.minQuantity > 0 &&
    form.categoryId.trim() !== "" &&
    (form.image || imageFile.value)
  );
});

const fileInputRef = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);

const form = reactive<Omit<Product, "category" | "id">>({
  title: "",
  description: "",
  price: 0,
  unit: "kg",
  minQuantity: 1,
  isPopular: false,
  categoryId: "",
  image: "",
});

watch(
  () => props.payload,
  (product) => {
    if (!product) return;

    form.title = product.title;
    form.description = product.description;
    form.price = product.price;
    form.unit = product.unit;
    form.minQuantity = product.minQuantity;
    form.isPopular = product.isPopular;
    form.categoryId = product.categoryId;
    form.image = product.image;
  },
  { immediate: true },
);

function triggerFileSelect() {
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  form.image = URL.createObjectURL(file);
  imageFile.value = file;
}

async function onSave() {
  if (!isFormValid) throw new Error("Form is invalid");
  const payload = {
    ...form,
  };

  if (isEditMode.value && props.payload) {
    for (const key of Object.keys(payload) as (keyof typeof payload)[]) {
      if (payload[key] !== props.payload[key]) {
        await store.updateProduct(
          { id: props.payload.id, ...payload },
          imageFile.value || undefined,
        );
        break;
      }
    }
  } else {
    if (imageFile.value) await store.createProduct(payload, imageFile.value);
  }

  emit("close");
}
</script>

<template>
  <form
    class="w-full max-w-2xl bg-white rounded-xl p-6 space-y-4"
    @submit.prevent="onSave"
  >
    <h2 class="text-xl font-semibold">
      {{ isEditMode ? "Edit product" : "Create product" }}
    </h2>

    <!-- TITLE -->
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black outline-none"
      />
    </div>

    <!-- DESCRIPTION -->
    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        v-model="form.description"
        rows="3"
        class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black outline-none resize-none"
      />
    </div>

    <!-- IMAGE + RIGHT COLUMN -->
    <div class="grid grid-cols-[220px_1fr] gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Product image</label>

        <div
          class="relative aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden"
          @click="triggerFileSelect"
        >
          <img
            v-if="form.image"
            :src="form.image"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <div
            v-else
            class="text-sm text-gray-400 flex flex-col items-center gap-1"
          >
            <span>Upload image</span>
            <span class="text-xs">PNG, JPG, WEBP</span>
          </div>
        </div>

        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />
      </div>

      <!-- RIGHT COLUMN -->
      <div class="flex flex-col gap-3">
        <!-- PRICE -->
        <div>
          <label class="block text-sm font-medium mb-1">Price</label>
          <input
            v-model.number="form.price"
            type="number"
            class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <!-- MIN QUANTITY -->
        <div>
          <label class="block text-sm font-medium mb-1">Min quantity</label>
          <input
            v-model.number="form.minQuantity"
            type="number"
            class="w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <!-- UNIT -->
        <div class="flex items-center justify-between gap-4">
          <span class="text-sm font-medium">Unit:</span>
          <select
            v-model="form.unit"
            class="border rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option value="kg">kg</option>
            <option value="szt">szt</option>
          </select>
        </div>

        <!-- CATEGORY -->
        <div class="flex items-center justify-between gap-4">
          <span class="text-sm font-medium">Category:</span>
          <select
            v-model="form.categoryId"
            class="border rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option disabled value="">Select</option>
            <option
              v-for="category in categoriesList"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>

        <!-- POPULAR -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Popular product:</span>
          <input v-model="form.isPopular" type="checkbox" class="w-4 h-4" />
        </div>
      </div>
    </div>

    <div class="flex gap-4 pt-4">
      <BaseButton
        class="w-full"
        type="submit"
        text="Save"
        :disabled="!isFormValid"
      />
    </div>
  </form>
</template>
