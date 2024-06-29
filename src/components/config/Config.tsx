import { useAppContext } from "@/AppContext";
import { twc } from "react-twc";
import { Button } from "../ui/button";
import { SectionTitle, Space } from "../ui/common";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMemo } from "react";
import AddIcon from "../icons/PlusIcon";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { QuantityRule } from "@/lib/schema";

const ConfigWrapper = twc.div`border border-dashed rounded-lg p-4`;
const CustomFormItem = twc(FormItem)`flex items-center justify-between gap-6`;
const CustomFormLabel = twc(FormLabel)`flex-1 text-base leading-snug`;
const CustomSelectTrigger = twc(SelectTrigger)`w-40 !mt-0`;
const CustomSwitch = twc(Switch)`!mt-0`;
const CustomInput = twc(Input)`w-40`;
const MappingSKUHeader = twc.div`flex flex-col gap-2`;
const MappingSKUTitle = twc.h3`font-bold flex items-center justify-between`;
const MappingSKUDescription = twc.p`text-zinc-600 text-sm`;

const layoutOptions = [
  {
    value: "simple-checkbox",
    label: "Simple Checkbox",
  },
  {
    value: "checkbox",
    label: "Checkbox",
  },
  {
    value: "multi-checkbox",
    label: "Multi Checkbox",
  },
  {
    value: "variant",
    label: "Variant",
  },
];

const quantityRules: { value: QuantityRule; label: string }[] = [
  {
    value: "DEFAULT",
    label: "1 & Có thể chỉnh sửa số lượng trong giỏ hàng",
  },
  {
    value: "ALWAY_EQUAL_TO_MAIN_PRODUCT",
    label:
      "Bằng số lượng sản phẩm chính & KHÔNG cho phép sửa chỉnh sửa trong giỏ hàng",
  },
  {
    value: "EQUAL_TO_MAIN_PRODUCT_BUT_CAN_CHANGE_IN_CART",
    label: "Bằng số lượng sản phẩm chính & có thể chỉnh sửa trong giỏ hàng",
  },
  {
    value: "CUSTOM",
    label: "Số lượng tùy chỉnh & có thể chỉnh sửa trong giỏ hàng",
  },
];

export default function Options() {
  const { product, form, reset } = useAppContext();
  const { isMultiVariant, defaultSelect, layout, sku, quantityRule } =
    form.watch();

  const requireDefaultSelectId = useMemo(
    () =>
      isMultiVariant &&
      defaultSelect &&
      (layout == "multi-checkbox" || layout == "variant"),
    [isMultiVariant, defaultSelect, layout]
  );

  const requireMappingSKU = useMemo(
    () =>
      isMultiVariant && (layout == "simple-checkbox" || layout == "checkbox"),
    [isMultiVariant, layout]
  );

  const requireQuantity = useMemo(
    () => quantityRule == "CUSTOM",
    [quantityRule]
  );

  return (
    <ConfigWrapper>
      <SectionTitle>Config Options</SectionTitle>

      <Space orientation="vertical" size="lg">
        <Space orientation="vertical" size="lg">
          <FormField
            name="layout"
            control={form.control}
            render={({ field }) => (
              <CustomFormItem>
                <CustomFormLabel>Giao diện upsell</CustomFormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <CustomSelectTrigger>
                      <SelectValue placeholder="Chọn giao diện" />
                    </CustomSelectTrigger>
                    <SelectContent>
                      {layoutOptions.map((layout) => (
                        <SelectItem key={layout.value} value={layout.value}>
                          {layout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </CustomFormItem>
            )}
          ></FormField>

          <FormField
            name="upsellOnProductPage"
            control={form.control}
            render={({ field }) => (
              <CustomFormItem>
                <CustomFormLabel>
                  Có bán upsell trên product page hay không?
                </CustomFormLabel>
                <FormControl>
                  <CustomSwitch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </CustomFormItem>
            )}
          ></FormField>

          <FormField
            name="upsellOnCartPage"
            control={form.control}
            render={({ field }) => (
              <CustomFormItem>
                <CustomFormLabel>
                  Có bán upsell trên cart page hay không?
                </CustomFormLabel>
                <FormControl>
                  <CustomSwitch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </CustomFormItem>
            )}
          ></FormField>

          <FormField
            name="defaultSelect"
            control={form.control}
            render={({ field }) => (
              <CustomFormItem>
                <CustomFormLabel>Có chọn sẵn hay không?</CustomFormLabel>
                <FormControl>
                  <CustomSwitch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </CustomFormItem>
            )}
          ></FormField>

          {requireDefaultSelectId && (
            <FormField
              name="defaultSelectId"
              control={form.control}
              render={({ field }) => (
                <CustomFormItem>
                  <CustomFormLabel>Variant mặc định được chọn</CustomFormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <CustomSelectTrigger className="w-60">
                        <SelectValue placeholder="Chọn variant mặc định" />
                      </CustomSelectTrigger>
                      <SelectContent>
                        {(product?.variants || []).map((variant) => (
                          <SelectItem value={String(variant.id)}>
                            <div>{variant.title}</div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </CustomFormItem>
              )}
            ></FormField>
          )}

          <FormField
            name="quantityRule"
            control={form.control}
            render={({ field }) => (
              <CustomFormItem>
                <CustomFormLabel>
                  Số lượng sản phẩm upsell add vào giỏ hàng
                </CustomFormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <CustomSelectTrigger>
                      <SelectValue placeholder="Chọn số lượng" />
                    </CustomSelectTrigger>
                    <SelectContent>
                      {quantityRules.map((quantityRule) => (
                        <SelectItem
                          key={quantityRule.value}
                          value={quantityRule.value}
                        >
                          {quantityRule.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </CustomFormItem>
            )}
          ></FormField>

          {requireQuantity && (
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <CustomFormItem>
                  <CustomFormLabel>Nhập số lượng cụ thể</CustomFormLabel>
                  <FormControl>
                    <CustomInput type="number" {...field} min={1} step={1} />
                  </FormControl>
                </CustomFormItem>
              )}
            ></FormField>
          )}

          {requireMappingSKU && (
            <Space orientation="vertical" size="lg">
              <MappingSKUHeader>
                <MappingSKUTitle>Mapping SKU</MappingSKUTitle>

                <MappingSKUDescription>
                  Mapping SKU là bắt buộc với giao diện dạng{" "}
                  <b>Simple Checkbox</b> hoặc <b>Checkbox</b> khi sản phẩm
                  upsell có nhiều variants
                </MappingSKUDescription>
                <MappingSKUDescription>
                  Ví dụ với mẫu Giftbox Tumbler, có 2 size Giftbox, phải đi kèm
                  với size của sản phẩm chính, ở đây chỉ định SKU của Giftbox sẽ
                  áp dụng với SKU nào của sản phẩm chính
                </MappingSKUDescription>
              </MappingSKUHeader>

              <FormField
                name="sku"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    {(field.value || []).map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          className="w-60"
                          disabled
                          value={item[0]}
                          onChange={(e) => {
                            const newSKU = (sku || []).map((row, i) => {
                              if (i == index) {
                                return [e.target.value, row[1]];
                              } else {
                                return row;
                              }
                            });
                            form.setValue("sku", newSKU);
                          }}
                          placeholder="SKU sản phẩm Upsell"
                        />
                        <Textarea
                          className="flex-1"
                          value={item[1]}
                          onChange={(e) => {
                            const newSKU = (sku || []).map((row, i) => {
                              if (i == index) {
                                return [row[0], e.target.value];
                              } else {
                                return row;
                              }
                            });
                            form.setValue("sku", newSKU);
                          }}
                          placeholder="List SKU sản phẩm chính, phân tách bằng cách xuống dòng"
                          rows={5}
                        />
                      </div>
                    ))}
                  </div>
                )}
              ></FormField>
            </Space>
          )}
        </Space>

        <Space className="flex justify-end">
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
          <Button disabled={!product} type="submit">
            Copy Config
          </Button>
        </Space>
      </Space>
    </ConfigWrapper>
  );
}
