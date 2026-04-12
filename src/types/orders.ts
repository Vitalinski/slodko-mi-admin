export type OrderMap = Record<string, Order>;

export type Order = {
  id: string;
  createdAt: string;
  dateOfOrder: string;
  name: string;
  email: string;
  phone: string;
  deliveryType: "pickup" | "delivery";
  street: string | null;
  houseNumber: string | null;
  postalCode: string | null;
  items: OrderItem[];
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  discount: number;
  discountAmount: number;
  promoCode: string;
  totalPrice: number;
};

export type OrderStatus = "NEW" | "PENDING" | "COMPLETED" | "CANCELED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "CANCELED";

export type OrdersFilter = Omit<LoadOrdersParams, "page" | "limit">;
export type LoadOrdersParams = {
  orderStatuses?: OrderStatus[];
  page?: number;
  limit?: number;
  searchValue?: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  title: string;
  price: number;
  quantity: number;
  unit: string;
  isPopular: boolean;
  minQuantity: number;
};
