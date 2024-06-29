import { z } from "zod";

export const schema = z
  .object({
    isMultiVariant: z.boolean({}),
    upsellOnProductPage: z.boolean(),
    upsellOnCartPage: z.boolean(),
    layout: z.enum(
      ["simple-checkbox", "checkbox", "multi-checkbox", "variant"],
      {
        required_error: "Chưa chọn layout giời ơii",
      }
    ),
    defaultSelect: z.boolean(),
    defaultSelectId: z.optional(z.coerce.string()),
    quantityRule: z.enum([
      "DEFAULT",
      "ALWAY_EQUAL_TO_MAIN_PRODUCT",
      "EQUAL_TO_MAIN_PRODUCT_BUT_CAN_CHANGE",
      "CUSTOM",
    ]),
    quantity: z.coerce.number().min(1),
    sku: z.optional(z.array(z.array(z.string()).length(2))),
    title: z.string(),
    description: z.string(),
    label: z.string(),
    popup: z.optional(
      z.object({
        triggerText: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  })
  .refine(
    (data) => {
      if (
        data.isMultiVariant &&
        (data.layout == "multi-checkbox" || data.layout == "variant") &&
        data.defaultSelect
      ) {
        if (data.defaultSelectId) return true;
        else return false;
      } else {
        return true;
      }
    },
    {
      message: "Variant ID mặc định không được để trống",
      path: ["defaultSelectId"],
    }
  )
  .refine(
    (data) => {
      if (
        data.isMultiVariant &&
        (data.layout == "simple-checkbox" || data.layout == "checkbox")
      ) {
        return (
          data.sku &&
          data.sku.every(
            (row) => row.length == 2 && row[0].length > 0 && row[1].length > 0
          )
        );
      } else {
        return true;
      }
    },
    {
      message: "Mapping SKU không được để trống",
      path: ["sku"],
    }
  )
  .refine((data) => data.upsellOnProductPage || data.upsellOnCartPage, {
    message:
      "Ít nhất phải bán upsell bán upsell trên product page hoặc cart page chứ",
    path: ["upsellOnProductPage"],
  })
  .refine((data) => data.upsellOnProductPage || data.upsellOnCartPage, {
    message: "Ít nhất phải bán upsell trên product page hoặc cart page chứ",
    path: ["upsellOnCartPage"],
  });

export type FormValues = z.infer<typeof schema>;
export type LayoutType = z.infer<typeof schema>["layout"];
export type QuantityRule = z.infer<typeof schema>["quantityRule"];
