export type ModalType = "productForm" | "categoryForm" | "delete";

export type deletePayload = {
  title: string;
  message?: string;
  onConfirm: () => Promise<void> | void;
};
