<script setup lang="ts">
import BaseCloseButton from "@/components/ui/BaseCloseButton.vue";
import type { ProductImage } from "@/types";
import { ref, computed, onMounted } from "vue";

const images = defineModel<ProductImage[]>("images", {
  default: () => [],
});

const props = defineProps<{
  validImages: ProductImage[];
}>();

const fileInputRef = ref<HTMLInputElement | null>(null);
const currentImageId = ref<string>("");

const currentImage = computed(() =>
  images.value.find((img) => img.id === currentImageId.value),
);

function triggerFileSelect() {
  if (!currentImageId.value) return;
  fileInputRef.value?.click();
}

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file || !fileInputRef.value) return;

  const index = images.value.findIndex(
    (img) => img.id === currentImageId.value,
  );

  if (index === -1 || !images.value[index]) return;

  images.value[index].url = URL.createObjectURL(file);
  images.value[index].file = file;
  fileInputRef.value.value = "";
}

function removeImage(id: string) {
  if (images.value.length === 1) return;

  const index = images.value.findIndex((img) => img.id === id);

  if (index === -1) return;

  images.value.splice(index, 1);

  if (currentImageId.value === id) {
    const nextImage = images.value[index] || images.value[index - 1];
    currentImageId.value = nextImage?.id ?? "";
  }
}

function addImageSlot() {
  if (images.value.length !== props.validImages.length) return;
  const id = crypto.randomUUID();
  images.value.push({ id, url: "" });
  currentImageId.value = id;
}

onMounted(() => {
  if (!images.value.length) {
    addImageSlot();
  }

  currentImageId.value = images.value[0]?.id || "";
});
</script>

<template>
  <div class="space-y-4">
    <label class="block text-sm font-medium">Product Images</label>

    <!-- MAIN IMAGE -->
    <div
      class="relative h-52 w-full rounded-lg border-2 flex items-center justify-center cursor-pointer hover:border-black transition overflow-hidden bg-gray-50"
      @click="triggerFileSelect"
    >
      <img
        v-if="currentImage?.url"
        :src="currentImage.url"
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

    <!-- SCROLLABLE SLOTS -->
    <div class="flex items-center gap-3">
      <div class="flex gap-3 overflow-x-auto pr-2 flex-1 py-2">
        <div
          v-for="{ id, url } in images"
          :key="id"
          class="relative shrink-0 group"
        >
          <button
            type="button"
            class="h-20 w-20 rounded-lg overflow-hidden border-2 group-hover:border-accent-dark transition cursor-pointer"
            :class="
              currentImageId === id ? 'border-accent' : 'border-transparent'
            "
            @click="currentImageId = id"
          >
            <img v-if="url" :src="url" class="h-full w-full object-cover" />
            <div
              v-else
              class="h-full w-full flex items-center justify-center text-gray-400 text-xs bg-gray-100"
            >
              Empty
            </div>
          </button>

          <BaseCloseButton
            v-if="images.length > 1"
            class="-top-2 -right-2 w-5 h-5 hover:scale-100!"
            @click.stop="removeImage(id)"
          />
        </div>
      </div>

      <div class="relative shrink-0">
        <div
          class="absolute -top-2 -right-2 bg-accent text-white px-2 py-0.5 rounded-full h-8 w-8 text-center"
        >
          {{ images.length }}
        </div>

        <button
          type="button"
          class="h-20 w-20 rounded-lg border-2 border-dashed flex items-center justify-center text-gray-400 hover:border-black cursor-pointer hover:text-black transition"
          @click="addImageSlot"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>
