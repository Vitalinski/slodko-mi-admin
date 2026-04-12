<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import type { OrdersFilter, OrderStatus } from "@/types";

const emit = defineEmits<{
  (
    e: "updateFilter",
    filter: {
      orderStatuses: OrderStatus[];
      searchValue: string;
    },
  ): void;
}>();

const ORDER_STATUSES: OrderStatus[] = [
  "NEW",
  "PENDING",
  "COMPLETED",
  "CANCELED",
] as const;

const props = defineProps<{ filter: OrdersFilter }>();

const currentFilter = reactive({
  searchValue: "",
  orderStatuses: [] as OrderStatus[],
});
const isStatusesOpen = ref(false);

const statusesLabel = computed(() => {
  const chosenStatuses = currentFilter.orderStatuses;
  if (!chosenStatuses.length) return "Sort orders";

  const visible = [];

  const sortStatuses = chosenStatuses.slice(0, 2 - visible.length);

  const rest = chosenStatuses.length - (2 - visible.length);
  visible.push(...sortStatuses);
  return rest > 0 ? `${visible.join(", ")} +${rest}` : visible.join(", ");
});

const isFilterChanged = computed(
  () =>
    currentFilter.searchValue !== props.filter.searchValue ||
    !isEqual(currentFilter.orderStatuses, props.filter.orderStatuses),
);

function isEqual(arr1: string[], arr2: string[] | undefined) {
  return (
    arr1.length === arr2?.length &&
    [...arr1].sort().every((v, i) => v === [...arr2].sort()[i])
  );
}

function search() {
  emit("updateFilter", {
    searchValue: currentFilter.searchValue,
    orderStatuses: [...currentFilter.orderStatuses],
  });
}

function toggleStatus(status: OrderStatus) {
  const index = currentFilter.orderStatuses.indexOf(status);

  if (index === -1) {
    currentFilter.orderStatuses.push(status);
  } else {
    currentFilter.orderStatuses = currentFilter.orderStatuses.filter(
      (el) => el !== status,
    );
  }
}

function clearCategories() {
  currentFilter.orderStatuses = [];
}
</script>

<template>
  <div class="flex gap-2 flex-wrap sm:flex-nowrap">
    <input
      v-model="currentFilter.searchValue"
      type="text"
      placeholder="Enter product name"
    />

    <div class="relative min-w-65 flex-1">
      <div
        class="h-12 w-full rounded-full select flex items-center gap-2 cursor-pointer transition"
        tabindex="0"
        @click="isStatusesOpen = !isStatusesOpen"
        @keydown.enter.prevent="isStatusesOpen = !isStatusesOpen"
      >
        <span
          class="flex-1"
          :class="{
            'text-text/50': !currentFilter.orderStatuses.length,
            'lowercase text-nowrap ': currentFilter.orderStatuses.length,
          }"
        >
          {{ statusesLabel }}
        </span>

        <div class="flex items-center gap-1.5 shrink-0">
          <button
            v-if="currentFilter.orderStatuses.length"
            class="text-text/60 hover:text-text text-base sm:text-lg cursor-pointer font-medium"
            @click.stop.prevent="clearCategories"
          >
            ✕
          </button>

          <span
            class="text-text/70 text-2xl leading-none transition-transform duration-200"
            :class="{ 'rotate-180': isStatusesOpen }"
          >
            ▾
          </span>
        </div>
      </div>

      <div
        v-if="isStatusesOpen"
        v-click-outside="() => (isStatusesOpen = false)"
        class="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-black/10 rounded-2xl shadow-lg max-h-80 overflow-y-auto"
      >
        <div>
          <label
            v-for="status in ORDER_STATUSES"
            :key="status"
            class="flex items-center gap-3 px-5 py-2.5 text-text text-[15px] sm:text-base hover:bg-accent/10 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              :checked="currentFilter.orderStatuses.includes(status)"
              class="w-4.5 h-4.5 accent-accent-dark cursor-pointer"
              @change="toggleStatus(status)"
            />
            <span>{{ status }} </span>
          </label>
        </div>
      </div>
    </div>

    <BaseButton
      class="w-full sm:w-auto"
      appearance="primary"
      text="Search"
      :disabled="!isFilterChanged"
      @click="search()"
    />
  </div>
</template>
