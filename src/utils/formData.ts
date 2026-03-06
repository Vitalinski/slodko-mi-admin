import type { Product, ProductBaseData } from "@/types";

export function toFormData(productData: ProductBaseData | Product): FormData {
  const formData = new FormData();
  const { images, ...rest } = productData;

  (Object.keys(rest) as Array<keyof typeof rest>).forEach((key) => {
    const value = rest[key];

    if (value !== undefined && value !== null) {
      formData.append(String(key), String(value));
    }
  });

  if (images && Array.isArray(images)) {
    const imagesMeta = images.map((img) => ({
      id: img.id,
      url: img.url ?? null,
      hasFile: !!img.file,
    }));

    formData.append("images", JSON.stringify(imagesMeta));
    images.forEach((img) => {
      if (img.file instanceof File) {
        formData.append("files", img.file);
      }
    });
  }
  for (const [key, value] of formData.entries()) {
    console.log(`FormData entry - ${key}:`, value);
  }
  return formData;
}
