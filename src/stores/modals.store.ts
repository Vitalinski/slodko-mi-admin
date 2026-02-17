import type { ModalType } from "@/types/modals.types";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: (): {
    isModalOpen: boolean;
    type?: ModalType;
    payload?: any;
  } => ({
    isModalOpen: false,
    type: undefined,
    payload: {},
  }),
  actions: {
    openModal(type: ModalType, payload?: any) {
      this.isModalOpen = true;
      this.type = type;
      this.payload = payload;
    },
    closeModal() {
      this.isModalOpen = false;
      this.type = undefined;
      this.payload = undefined;
    },
  },
});
