<script setup lang="ts">
import BaseLoader from "@/components/ui/BaseLoader.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import type { LoadOrdersParams, Order, OrderStatus } from "@/types";
import { formatMoney } from "@/utils/money";
import { onMounted, ref, useTemplateRef, computed, reactive } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { useOrdersStore } from "@/stores/orders";
import OrdersFilter from "@/components/ordersPage/OrdersFilter.vue";
import { useModalStore } from "@/stores/modals.store";

const ORDERS_PER_PAGE = 8;
const FIRST_PAGE_INDEX = 1;
const ORDER_STATUSES: OrderStatus[] = [
  "NEW",
  "PENDING",
  "COMPLETED",
  "CANCELED",
] as const;

const headers = [
  "Data",
  "Price",
  "Name",
  "Phone",
  "Email",
  "Delivery",
  "Status",
];

const modalStore = useModalStore();
const ordersStore = useOrdersStore();
const el = useTemplateRef("el");
const filter = reactive<LoadOrdersParams>({
  searchValue: "",
  orderStatuses: [],
});

const isLoading = ref(false);

const orders = computed(() => Object.values(ordersStore.orders));

async function loadNextPage() {
  if (isLoading.value) return;

  if (ordersStore.totalCount <= orders.value.length) return;

  isLoading.value = true;
  await ordersStore.loadOrders({
    orderStatuses: filter.orderStatuses,
    searchValue: filter.searchValue,
    page: orders.value.length / ORDERS_PER_PAGE + FIRST_PAGE_INDEX,
  });

  isLoading.value = false;
}

async function changeOrderStatus(id: string, e: Event) {
  const newStatus = (e.target as HTMLSelectElement).value;

  if (!newStatus || !isOrderStatus(newStatus)) return;

  isLoading.value = true;
  await ordersStore.updateOrder(id, newStatus);
  isLoading.value = false;
}

function isOrderStatus(value: string): value is OrderStatus {
  return ORDER_STATUSES.includes(value as OrderStatus);
}

async function onUpdateFilter(filterSettings: LoadOrdersParams) {
  Object.assign(filter, filterSettings);
  isLoading.value = true;
  ordersStore.reset();
  await ordersStore.loadOrders({
    orderStatuses: filter.orderStatuses,
    searchValue: filter.searchValue,
  });
  isLoading.value = false;
}

function openOrderInfoModal(order: Order) {
  modalStore.openModal("orderInfo", order);
}

useInfiniteScroll(
  el,
  () => {
    loadNextPage();
  },
  {
    distance: 120,
    canLoadMore: () => ordersStore.totalCount > orders.value.length,
  },
);

onMounted(async () => {
  isLoading.value = true;
  await ordersStore.loadOrders();
  isLoading.value = false;
});
</script>

<template>
  <div class="p-8 space-y-12">
    <h3 class="text-center">Orders Administration</h3>

    <section class="space-y-4 flex flex-col">
      <OrdersFilter :is-loading :filter @update-filter="onUpdateFilter" />
      <BaseTable grid-template=" 1fr 1fr 1fr  1fr 1fr 1fr 150px">
        <template #head>
          <th
            v-for="header in headers"
            :key="header"
            class="px-4 py-3 text-left font-medium"
          >
            {{ header }}
          </th>
        </template>

        <template #body>
          <tbody
            ref="el"
            class="flex flex-col h-120 overflow-auto divide-y divide-gray-200"
          >
            <tr
              v-for="order in orders"
              :key="order.id"
              class="hover:bg-gray-50 hover:cursor-pointer items-center grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_150px]"
              @click="openOrderInfoModal(order)"
            >
              <td class="px-4 py-3 flex items-center gap-3">
                <span class="font-medium text-gray-900">{{
                  order.dateOfOrder.slice(0, 10)
                }}</span>
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ formatMoney(order.totalPrice) }}
              </td>

              <td class="px-4 py-3 text-gray-700 white">
                {{ order.name }}
              </td>

              <td class="px-4 py-3 text-gray-700">
                {{ order.phone }}
              </td>

              <td class="px-4 py-3 text-gray-700 text-ellipsis overflow-hidden">
                {{ order.email }}
              </td>

              <td class="px-4 py-3">
                <div class="max-w-xs truncate text-gray-600">
                  {{ order.deliveryType }}
                </div>
              </td>

              <td class="px-4 py-3">
                <div class="max-w-xs truncate text-gray-600" @click.stop>
                  <select
                    name="statuses"
                    class="cursor-pointer w-full rounded-lg pl-2 py-2 text-sm outline-none"
                    :class="{
                      'bg-blue-50 text-blue-700 border border-blue-200':
                        order.orderStatus === 'NEW',
                      'bg-yellow-50 text-yellow-700 border border-yellow-200':
                        order.orderStatus === 'PENDING',
                      'bg-green-50 text-green-700 border border-green-200':
                        order.orderStatus === 'COMPLETED',
                      'bg-red-50 text-red-700 border border-red-200':
                        order.orderStatus === 'CANCELED',
                    }"
                    @change="changeOrderStatus(order.id, $event)"
                  >
                    <option
                      v-for="status in ORDER_STATUSES"
                      :key="status"
                      :value="status"
                      :selected="status === order.orderStatus"
                    >
                      {{ status }}
                    </option>
                  </select>
                </div>
              </td>
            </tr>
            <BaseLoader v-if="isLoading" :class="{ 'h-8': orders.length }" />
            <div v-else-if="!orders.length" class="m-auto">
              <h3 class="text-center">No orders</h3>
              <p class="text-xl">
                Try to change filter settings or reload the page
              </p>
            </div>
          </tbody>
        </template>
      </BaseTable>
    </section>
  </div>
</template>
