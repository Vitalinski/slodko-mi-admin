export type ModalType = "productForm" | "categoryForm" | "orderInfo" | "delete";

export type deletePayload = {
  title: string;
  message?: string;
  onConfirm: () => Promise<void> | void;
};
