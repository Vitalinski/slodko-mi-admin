<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { useCategoriesStore } from "@/stores/categories";
import BaseButton from "../ui/BaseButton.vue";
import type { Filter } from "@/types";

const emit = defineEmits<{
  (
    e: "updateFilter",
    filter: {
      searchValue: string;
      onlyPopular: boolean;
      categories: string[];
    },
  ): void;
}>();

const props = defineProps<{ filter: Filter }>();

const categoriesStore = useCategoriesStore();
const filter = reactive({
  searchValue: "",
  onlyPopular: false,
  categories: [] as string[],
});
const isCategoriesOpen = ref(false);

const categories = computed(() => Object.values(categoriesStore.categories));
const selectedCategories = computed(() => {
  return categories.value.filter((c) => filter.categories.includes(c.slug));
});
const categoriesLabel = computed(() => {
  if (!selectedCategories.value.length && !filter.onlyPopular)
    return "Sort products";

  const visible = [];

  if (filter.onlyPopular) {
    visible.push("Popular");
  }

  const sortCategories = selectedCategories.value
    .slice(0, 2 - visible.length)
    .map((c) => c.title);
  const rest = selectedCategories.value.length - (2 - visible.length);
  visible.push(...sortCategories);
  return rest > 0 ? `${visible.join(", ")} +${rest}` : visible.join(", ");
});

const isFilterChanged = computed(
  () =>
    filter.searchValue !== props.filter.searchValue ||
    filter.onlyPopular !== props.filter.onlyPopular ||
    !isEqual(filter.categories, props.filter.categories),
);

function isEqual(arr1: string[], arr2: string[]) {
  return (
    arr1.length === arr2.length &&
    [...arr1].sort().every((v, i) => v === [...arr2].sort()[i])
  );
}

function search() {
  emit("updateFilter", {
    searchValue: filter.searchValue,
    onlyPopular: filter.onlyPopular,
    categories: [...filter.categories],
  });

}

function toggleCategory(id: string) {
  const index = filter.categories.indexOf(id);

  if (index === -1) {
    filter.categories.push(id);
  } else {
    filter.categories.splice(index, 1);
  }
}

function clearCategories() {
  filter.categories = [];
  filter.onlyPopular = false;
}
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      v-model="filter.searchValue"
      placeholder="Enter product name"
    />

    <div class="relative min-w-65 flex-1">
      <div
        class="h-12 w-full rounded-full select flex items-center gap-2 cursor-pointer transition"
        tabindex="0"
        @click="isCategoriesOpen = !isCategoriesOpen"
        @keydown.enter.prevent="isCategoriesOpen = !isCategoriesOpen"
      >
        <span
          class="flex-1"
          :class="{
            'text-text/50': !selectedCategories.length && !filter.onlyPopular,
          }"
        >
          {{ categoriesLabel }}
        </span>

        <div class="flex items-center gap-1.5 shrink-0">
          <button
            v-if="filter.categories.length || filter.onlyPopular"
            @click.stop.prevent="clearCategories"
            class="text-text/60 hover:text-text text-base sm:text-lg cursor-pointer font-medium"
          >
            ✕
          </button>

          <span
            class="text-text/70 text-2xl leading-none transition-transform duration-200"
            :class="{ 'rotate-180': isCategoriesOpen }"
          >
            ▾
          </span>
        </div>
      </div>

      <div
        v-if="isCategoriesOpen && categories.length"
        v-click-outside="() => (isCategoriesOpen = false)"
        class="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-black/10 rounded-2xl shadow-lg max-h-[320px] overflow-y-auto"
      >
        <div>
          <label
            class="flex items-center gap-3 px-5 py-2.5 text-text text-[15px] sm:text-base hover:bg-accent/10 cursor-pointer transition-colors border-b-1 border-b-gray-300"
          >
            <input
              type="checkbox"
              :checked="filter.onlyPopular"
              @change="filter.onlyPopular = !filter.onlyPopular"
              class="w-4.5 h-4.5 accent-accent-dark cursor-pointer"
            />
            <span>Only popular</span>
          </label>
          <label
            v-for="cat in categories"
            :key="cat.id"
            class="flex items-center gap-3 px-5 py-2.5 text-text text-[15px] sm:text-base hover:bg-accent/10 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              :checked="filter.categories.includes(cat.slug)"
              @change="toggleCategory(cat.slug)"
              class="w-4.5 h-4.5 accent-accent-dark cursor-pointer"
            />
            <span>{{ cat.title }} </span>
          </label>
        </div>
      </div>
    </div>

    <BaseButton
      appearance="primary"
      text="Search"
      @click="search()"
      :disabled="!isFilterChanged"
    />
  </div>
</template>
