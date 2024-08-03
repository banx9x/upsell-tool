import { useCallback, useEffect } from "react";
import { twc } from "react-twc";
import { toast } from "sonner";
import { useAppContext } from "./AppContext";
import ProductForm from "./components/ProductForm";
import Config from "./components/config/Config";
import Preview from "./components/previews/Preview";
import { Container, Logo } from "./components/ui/common";
import { Form } from "./components/ui/form";
import { FormValues } from "./lib/schema";
import { serializeOutput } from "./lib/utils";

const FormWrapper = twc.form`grid grid-cols-2 gap-2 rounded-lg p-2 shadow-lg shadow-gray-200/75`;

function App() {
  const { product, form } = useAppContext();

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error(errors);

      for (const [field, error] of Object.entries(errors)) {
        toast("Giời ơi là giời", {
          description: error.message,
        });
      }
    }
  }, [errors]);

  const onSubmit = useCallback(
    (values: FormValues) => {
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
          .writeText(
            JSON.stringify(serializeOutput(transformedValues), null, 2)
          )
          .then(() => {
            toast("Yayyyy! 🙂‍↔️", {
              description: "Đã copy, tiếp theo hãy paste vào metafields nhé, good luck!",
              action: {
                label: "Go to metafields",
                onClick: () => {
                  window.open(
                    `https://admin.shopify.com/store/dreamgifters/products/${
                      product!.id
                    }/metafields`,
                    "_blank"
                  );
                },
              },
              duration: 30000,
            });
          })
          .catch((error) => {
            toast("Úi có lỗi rồi 😭", {
              description: `Chụp lại lỗi rồi dí cho dev nhé: ${String(error)}`,
            });
          });
      }
    },
    [product]
  );

  if (!product) {
    return <ProductForm />;
  }

  return (
    <Container>
      <Logo>Upsell Config by Ba Còi</Logo>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <Config />
          <Preview />
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default App;
