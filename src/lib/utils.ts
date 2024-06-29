import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeUrl(url: string) {
  return url.split("?")[0].concat(".json");
}

export function getVariantImage(product: Product, variantId?: number | string) {
  return product.images.find((image) => image.id == variantId) || product.image;
}
