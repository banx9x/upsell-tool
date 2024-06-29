export interface GetProductResponse {
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  published_scope: string;
  tags: string;
  variants: Variant[];
  options: Option[];
  images: Image[];
  image: Image2;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: unknown;
  option1: string;
  option2: string;
  option3: unknown;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: unknown;
  grams: number;
  image_id: number;
  weight: number;
  weight_unit: string;
  requires_shipping: boolean;
  quantity_rule: QuantityRule;
  quantity_price_breaks: unknown[];
}

export interface QuantityRule {
  min: number;
  max: unknown;
  increment: number;
}

export interface Option {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface Image {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: unknown;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

export interface Image2 {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt: unknown;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}
