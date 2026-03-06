import type { Product } from "@/types";
import type { ModalType } from "@/types/modals.types";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): {
    isModalOpen: boolean;
    type?: ModalType;
    payload?: Product | undefined;
  } => ({
    isModalOpen: false,
    type: undefined,
    payload: undefined,
  }),
  actions: {
    openModal(type: ModalType, payload?: Product | undefined) {
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
