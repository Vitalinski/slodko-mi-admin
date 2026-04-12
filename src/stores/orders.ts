import { defineStore } from "pinia";
import type { LoadOrdersParams, Order, OrderMap, OrderStatus } from "@/types";
import {
  fetchNewOrdersCount,
  fetchOrders,
  updateOrderStatus,
} from "@/api/orders.api";

export const useOrdersStore = defineStore("orders", {
  state: (): {
    orders: OrderMap;
    newOrdersCount: number;
    totalCount: number;
  } => ({
    orders: {},
    newOrdersCount: 0,
    totalCount: 0,
  }),

  getters: {},
  actions: {
    setOrders(orders: Order[], totalCount: number) {
      const formattedOrders: OrderMap = {};
      for (const order of orders) {
        formattedOrders[order.id] = order;
      }

      this.orders = { ...this.orders, ...formattedOrders };
      this.totalCount = totalCount;
    },

    setNewOrdersCount(count: number) {
      this.newOrdersCount = count;
    },

    async loadOrders(
      { orderStatuses, page, limit, searchValue }: LoadOrdersParams = {
        orderStatuses: [],
        searchValue: "",
      },
    ) {
      const { data } = await fetchOrders({
        orderStatuses,
        searchValue,
        page,
        limit,
      });
      this.setOrders(data.orders, data.totalCount);
    },

    async loadNewOrdersCount() {
      const res = await fetchNewOrdersCount();
      this.setNewOrdersCount(res.data);

    },

    async updateOrder(id: string, newStatus: OrderStatus) {
      const resp = await updateOrderStatus(id, newStatus);
      this.orders[id] = resp.data;
    },
    async reset() {
      this.orders = {};
    },
  },
});
