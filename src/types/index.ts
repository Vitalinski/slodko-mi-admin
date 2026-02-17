export type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  unit: "szt" | "kg";
  description: string;
  minQuantity: number;
  isPopular: boolean;
  categoryId: string;
  category: Omit<Category, "products">;
};

export type ProductFormData = Omit<Product, "id" | "category">;

export type ProductMap = Record<string, Product>;

export type LoadProductsParams = {
  category?: string;
  page?: number;
  limit?: number;
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  showInHeader: boolean;
  order: number;
  products: Product[];
};
