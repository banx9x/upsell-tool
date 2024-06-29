import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { makeUrl } from "@/lib/utils";
import { GetProductResponse } from "@/lib/types";
import { toast } from "sonner";
import { useAppContext } from "@/AppContext";
import { Container, Logo, Space } from "./ui/common";
import { twc } from "react-twc";

const FormLabel = twc.label`font-bold`;

export default function ProductForm() {
  const { form, setProduct } = useAppContext();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    if (url) {
      setLoading(true);

      fetch(makeUrl(url))
        .then((res) => res.json() as Promise<GetProductResponse>)
        .then(({ product }) => {
          setProduct(product);

          form.setValue("isMultiVariant", product.variants.length > 1);
          form.setValue(
            "sku",
            product.variants.map((v) => [v.sku, ""])
          );
          form.setValue("defaultSelectId", String(product.variants[0].id));

          toast("Yayyyy! 🙂‍↔️", {
            description:
              "Load dữ liệu sản phẩm thành công, hé hé",
          });
        })
        .catch((error) => {
          console.error(error);
          toast("Úi có lỗi rồi 😭", {
            description: "Có lỗi khi load dữ liệu sản phẩm",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Container>
      <Logo>Upsell Config by Ba Còi</Logo>

      <Space orientation="vertical">
        <Space>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Upsell Product URL"
          />
          <Button disabled={loading} onClick={loadData} variant="secondary">
            Load Upsell Product Data
          </Button>
        </Space>
      </Space>
    </Container>
  );
}
