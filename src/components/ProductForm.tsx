import { useAppContext } from "@/AppContext";
import { GetProductResponse } from "@/lib/types";
import { makeUrl } from "@/lib/utils";
import { useRef, useState } from "react";
import { twc } from "react-twc";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Container, Logo, Space } from "./ui/common";
import { Input } from "./ui/input";
export default function ProductForm() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { form, setProduct } = useAppContext();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadData = () => {
    if (url) {
      setLoading(true);

      fetch(makeUrl(url))
        .then((res) => res.json() as Promise<GetProductResponse>)
        .then(({ product }) => {
          setProduct(product);
          form.setValue("id", product.id);
          form.setValue("isMultiVariant", product.variants.length > 1);
          form.setValue(
            "sku",
            product.variants.map((v) => [v.sku, ""])
          );
          form.setValue("defaultSelectId", String(product.variants[0].id));

          toast("Yayyyy! 🙂‍↔️", {
            description: "Load dữ liệu sản phẩm thành công, hé hé",
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
            placeholder="Paste Upsell Product's link here to get start ..."
          />
          <Button disabled={loading} onClick={loadData} variant="secondary">
            Load Upsell Product Data
          </Button>
        </Space>

        <Collapsible onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex items-center">
            <span>Don't know how to get the product link?</span>
            {open && (
              <>
                <span className="ml-1">Very disappointing 😤</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Button
              size="sm"
              variant="ghost"
              className="mb-2"
              onClick={(e) => {
                e.preventDefault();

                if (imgRef.current) {
                  imgRef.current.src = "how-to-get-link.gif";
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-counterclockwise mr-1"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
              </svg>
              Replay
            </Button>
            <div className="flex">
              <div className="relative">
                <img
                  ref={imgRef}
                  src="how-to-get-link.gif"
                  className="w-1/2"
                  alt="How to get product link link"
                  width={480}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Space>
    </Container>
  );
}
