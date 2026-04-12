<script setup lang="ts">
import type { Order } from "@/types";

const props = defineProps<{
  payload: Order;
}>();

const formatDate = (date: string) =>
  new Date(date).toLocaleString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusClass = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "text-green-600";
    case "CANCELED":
      return "text-red-500";
    case "PENDING":
      return "text-yellow-600";
    default:
      return "text-blue-500";
  }
};
</script>

<template>
  <div class="space-y-6 text-sm overflow-y-auto rounded-xl p-6 bg-white">
    <div class="flex items-start justify-between">
      <div>
        <h2 class="text-xl font-semibold">Order #{{ props.payload.id }}</h2>
        <p class="text-gray-500">
          {{ formatDate(props.payload.createdAt) }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="border rounded-xl p-4 space-y-2">
        <h3 class="font-semibold text-base">Customer</h3>

        <p>
          <span class="text-gray-500">Name:</span>
          {{ props.payload.name }}
        </p>

        <p>
          <span class="text-gray-500">Email:</span>
          {{ props.payload.email }}
        </p>

        <p>
          <span class="text-gray-500">Phone:</span>
          {{ props.payload.phone }}
        </p>
      </div>

      <div class="border rounded-xl p-4 space-y-2">
        <h3 class="font-semibold text-base">Delivery</h3>

        <p>
          <span class="text-gray-500">Type:</span>
          {{ props.payload.deliveryType }}
        </p>

        <template v-if="props.payload.deliveryType === 'delivery'">
          <p>
            <span class="text-gray-500">Street:</span>
            {{ props.payload.street }}
          </p>
          <p>
            <span class="text-gray-500">House:</span>
            {{ props.payload.houseNumber }}
          </p>
          <p>
            <span class="text-gray-500">Postal code:</span>
            {{ props.payload.postalCode }}
          </p>
        </template>

        <template v-else>
          <p class="text-gray-500 italic">
            Pickup selected — no delivery address required
          </p>
        </template>
      </div>
    </div>

    <div class="border rounded-xl p-4 space-y-3">
      <h3 class="font-semibold text-base">Items</h3>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in props.payload.items"
          :key="item.id"
          class="flex justify-between border-b pb-2"
        >
          <div>
            <p class="font-medium">{{ item.title }}</p>
            <p class="text-gray-500 text-xs">
              {{ item.quantity }} × {{ item.price }} {{ item.unit }}
            </p>
          </div>

          <div class="font-medium">
            {{ item.quantity * item.price }}
          </div>
        </div>
      </div>
    </div>

    <div class="border rounded-xl p-4 space-y-2">
      <h3 class="font-semibold text-base">Summary</h3>

      <p>
        <span class="text-gray-500">Discount:</span>
        {{ props.payload.discount }}%
      </p>

      <p>
        <span class="text-gray-500">Discount amount:</span>
        -{{ props.payload.discountAmount }}
      </p>

      <div class="flex justify-between pt-3 border-t">
        <p class="text-lg font-semibold">
          Total: {{ props.payload.totalPrice }}
        </p>

        <div class="text-right space-y-1">
          <p class="font-semibold">
            Order Status:
            <span :class="statusClass(props.payload.orderStatus)">{{
              props.payload.orderStatus
            }}</span>
          </p>

          <p class="font-semibold">
            Payment:
            <span :class="statusClass(props.payload.paymentStatus)">{{
              props.payload.paymentStatus
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
