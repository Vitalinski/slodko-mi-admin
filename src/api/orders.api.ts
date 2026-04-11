import { api } from "./client";
import {
  type LoadOrdersParams,
  type OrderStatus,
} from "@/types";

export function fetchOrders(
  params: LoadOrdersParams = {
    orderStatuses: [],
    searchValue: "",
  },
) {
  try {
    return api.get("/orders", { params });
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

export function fetchNewOrdersCount() {
  try {
    return api.get("/orders/new");
  } catch (error) {
    console.error("Error getting new orders count:", error);
    throw error;
  }
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  try {
    return api.patch("/orders/" + id, { newStatus: status });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
