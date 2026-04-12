import type { Category, Order, Product } from "@/types";
import type { deletePayload, ModalType } from "@/types/modals";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): {
    isModalOpen: boolean;
    type?: ModalType;
    payload?: Product | undefined | deletePayload | Category | Order;
  } => ({
    isModalOpen: false,
    type: undefined,
    payload: undefined,
  }),
  actions: {
    openModal(
      type: ModalType,
      payload?: Product | undefined | deletePayload | Category | Order,
    ) {
      this.isModalOpen = true;
      this.type = type;
      this.payload = payload;
      this.addBodyScrollPrevent();
    },
    closeModal() {
      this.isModalOpen = false;
      this.type = undefined;
      this.payload = undefined;
      this.removeBodyScrollPrevent();
    },
    addBodyScrollPrevent() {
      document.body.classList.add("overflow-hidden");
    },
    removeBodyScrollPrevent() {
      document.body.classList.remove("overflow-hidden");
    },
  },
});
