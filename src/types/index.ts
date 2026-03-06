export type ProductBaseData = {
  title: string;
  images: ProductImage[];
  price: number;
  unit: "szt" | "kg";
  description: string;
  minQuantity: number;
  isPopular: boolean;
  categoryId: string;
};

export type Product = ProductBaseData & {
  id: string;
  category: Omit<Category, "products">;
};

export type ProductImage = {
  id: string;
  url: string;
  file?: File;
};

export type ProductMap = Record<string, Product>;

export type LoadProductsParams = {
  categories: string[];
  onlyPopular: boolean;
  searchValue: string;
  page?: number;
  limit?: number;
};

export type Filter = Omit<LoadProductsParams, "page" | "limit">;

export type Category = {
  id: string;
  slug: string;
  title: string;
  showInHeader: boolean;
  order: number;
  products: Product[];
};
