import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";
import { OutputData } from "./schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeUrl(url: string) {
  return url.split("?")[0].concat(".json");
}

export function getVariantImage(product: Product, variantId?: number | string) {
  return product.images.find((image) => image.id == variantId) || product.image;
}

export function serializeOutput(data: OutputData) {
  const clone = { ...data } as Partial<OutputData>;

  if (
    !data.isMultiVariant ||
    data.layout == "multi-checkbox" ||
    data.layout == "variant"
  ) {
    delete clone.sku;
  }

  if (data.layout == "simple-checkbox") {
    delete clone.label;
  }

  if (data.layout == "simple-checkbox" || data.layout == "variant") {
    delete clone.popup;
  }

  if (
    !data.isMultiVariant ||
    !data.defaultSelect ||
    data.layout == "simple-checkbox" ||
    data.layout == "checkbox"
  ) {
    delete clone.defaultSelectId;
  }

  if (data.quantityRule !== "CUSTOM") {
    delete clone.quantity;
  }

  return clone;
}
