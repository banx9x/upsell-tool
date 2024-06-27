import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddIcon from "./components/icons/PlusIcon";
import SimpleCheckboxPreview from "./components/previews/SimpleCheckboxPreview";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./components/ui/select";
import { Toaster } from "./components/ui/sonner";
import { Switch } from "./components/ui/switch";
import { schema } from "./lib/schema";
import { toast } from "sonner";
import { templates } from "./lib/template";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Textarea } from "./components/ui/textarea";
import CheckboxPreview from "./components/previews/CheckboxPreview";
import MultiCheckboxPreview from "./components/previews/MultiCheckboxPreview";
import VariantPreview from "./components/previews/VariantPreview";
import PopupPreview from "./components/previews/PopupPreview";

function App() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      isMultiVariant: false,
      upsellOnProductPage: true,
      upsellOnCartPage: false,
      layout: "checkbox",
      defaultSelect: true,
      defaultSelectId: "",
      isAmountEqualToMainProduct: false,
      isQuantityAddToCartEqualToMainProduct: false,
      quantityAddToCart: 1,
      sku: [["", ""]],
      title: "Bấm vào đây để sửa tiêu đề",
      description: "Bấm vào đây để sửa nội dung",
      label: "Bấm vào đây để sửa label",
      popup: {
        title: "Bấm vào đây để sửa tiêu đề",
        description: "Bấm vào đây để sửa nội dung",
      },
    },
  });

  const {
    isMultiVariant,
    layout,
    defaultSelect,
    isAmountEqualToMainProduct,
    isQuantityAddToCartEqualToMainProduct,
    sku,
  } = form.watch();

  const {
    formState: { errors },
  } = form;

  console.log(errors);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      for (const [field, error] of Object.entries(errors)) {
        toast("Giời ơi là giời", {
          description: error.message,
        });
      }
    }
  }, [errors]);

  const needProvideDefaultSelectId = useMemo(
    () => defaultSelect && (layout == "multi-checkbox" || layout == "variant"),
    [defaultSelect, layout]
  );

  const needProvideMappingSKU = useMemo(
    () =>
      isMultiVariant && (layout == "simple-checkbox" || layout == "checkbox"),
    [isMultiVariant, layout]
  );

  const hasPopupPreview = useMemo(
    () => layout == "checkbox" || layout == "multi-checkbox",
    [layout]
  );

  const Preview = useMemo(() => {
    switch (layout) {
      case "simple-checkbox": {
        return SimpleCheckboxPreview;
      }

      case "checkbox": {
        return CheckboxPreview;
      }

      case "multi-checkbox": {
        return MultiCheckboxPreview;
      }

      case "variant": {
        return VariantPreview;
      }

      default: {
        return () => null;
      }
    }
  }, [layout]);

  const onSubmit = useCallback((values: z.infer<typeof schema>) => {
    const transformedValues = {
      ...values,
      sku: (values.sku || []).reduce((acc, row) => {
        if (row[0].length > 0 && row[1].length > 0) {
          acc[row[0]] = row[1]
            .split("\n")
            .map((v) => v.trim())
            .filter(Boolean);
        }

        return acc;
      }, {} as Record<string, string[]>),
    };

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(JSON.stringify(transformedValues))
        .then(() => {
          toast("Yayyyy! 🙂‍↔️", {
            description: "Đã copy, paste vào metafields nhé, good luck!",
          });
        })
        .catch((error) => {
          toast("Úi có lỗi rồi 😭", {
            description: `Chụp lại lỗi rồi dí cho dev nhé: ${String(error)}`,
          });
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pt-6">
      <h1 className="text-3xl font-bold mb-4">Upsell tool</h1>
      <div className="flex items-start space-x-3 w-full max-w-5xl bg-white rounded-lg border border-zinc-100 p-2">
        <Form {...form}>
          <div className="flex-1 bg-white rounded-lg border border-dashed border-x-zinc-200 p-3">
            <h2 className="text-xl font-bold mb-5">Config Options</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="isMultiVariant"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel>
                      Sản phẩm upsell có nhiều variant hay không?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="upsellOnProductPage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel>
                      Có bán upsell trên product page hay không?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="upsellOnCartPage"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel>
                      Có bán upsell trên cart page hay không?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="layout"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel className="flex-1">
                      Giao diện hiển thị dạng
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-40 !mt-0">
                          <SelectValue placeholder="Chọn layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple-checkbox">
                            Simple checkbox
                          </SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="multi-checkbox">
                            Multi-Checkbox
                          </SelectItem>
                          <SelectItem value="variant">Variant</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="defaultSelect"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel>Mặc định có chọn sẵn hay không?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              {needProvideDefaultSelectId && (
                <FormField
                  name="defaultSelectId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-8">
                      <FormLabel>Variant ID mặc định</FormLabel>
                      <FormControl>
                        <Input className="w-40" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              )}

              <FormField
                name="isAmountEqualToMainProduct"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-8">
                    <FormLabel>
                      Số lượng sản phẩm upsell luôn luôn bằng với sản phẩm
                      chính?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="!mt-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              {!isAmountEqualToMainProduct && (
                <FormField
                  name="isQuantityAddToCartEqualToMainProduct"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-8">
                      <FormLabel>
                        Số lượng sản phẩm upsell add vào giỏ hàng bằng với số
                        lượng sản phẩm chính không?
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="!mt-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              )}

              {!isAmountEqualToMainProduct &&
                !isQuantityAddToCartEqualToMainProduct && (
                  <FormField
                    name="quantityAddToCart"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between gap-8">
                        <FormLabel>
                          Số lượng sản phẩm upsell add vào giỏ hàng
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="w-20"
                            min={1}
                            step={1}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  ></FormField>
                )}

              {needProvideMappingSKU && (
                <>
                  <hr />

                  <div className="flex flex-col gap-2">
                    <div className="font-semibold flex items-center justify-between">
                      <span>Mapping SKU</span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();

                          form.setValue(
                            "sku",
                            (form.getValues("sku") || []).concat([["", ""]])
                          );
                        }}
                      >
                        <AddIcon />
                        <span>Add items</span>
                      </Button>
                    </div>

                    <div className="text-zinc-500 text-sm">
                      Ví dụ với mẫu Giftbox Tumbler, có 2 size Giftbox, phải đi
                      kèm với size của sản phẩm chính, ở đây chỉ định SKU của
                      Giftbox sẽ áp dụng với SKU nào của sản phẩm chính
                    </div>

                    <FormField
                      name="sku"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          {(field.value || []).map((item, index) => (
                            <div key={index} className="flex gap-2">
                              <div className="flex-1">
                                <Input
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
                              </div>
                              <div className="flex-1">
                                <Textarea
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
                            </div>
                          ))}
                        </div>
                      )}
                    ></FormField>
                  </div>
                </>
              )}

              <div className="mt-4 flex justify-end gap-4">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">Load template</Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-80">
                    {templates.map((template) => (
                      <DropdownMenuItem key={template.key}>
                        <div className="flex flex-col gap-1">
                          <div style={{ fontWeight: 600 }}>
                            {template.title}
                          </div>
                          <div className="text-zinc-600">
                            {template.description}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu> */}

                <Button type="submit">Copy Config</Button>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-zinc-50/50 rounded-lg p-3">
            <h2 className="text-xl font-bold mb-5">Preview</h2>

            {layout && (
              <>
                <h3 className="font-semibold my-2">Layout</h3>

                <div className="p-2 border border-dashed border-zinc-200 rounded min-h-16 my-2">
                  <Preview form={form} />
                </div>
              </>
            )}

            {hasPopupPreview && (
              <>
                <h3 className="font-semibold my-2">Popup More Infomation</h3>

                <div className="rounded min-h-48 my-2 bg-zinc-500/50 p-3">
                  <PopupPreview form={form} />
                </div>
              </>
            )}
          </div>
        </Form>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default App;
