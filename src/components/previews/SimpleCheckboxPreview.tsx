import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { schema } from "@/lib/schema";

type SimpleCheckboxPreviewProps = {
  form: UseFormReturn<z.infer<typeof schema>>;
};

export default function SimpleCheckboxPreview({
  form,
}: SimpleCheckboxPreviewProps) {
  const { defaultSelect, title, description } = form.watch();
  return (
    <div className="flex items-start gap-1">
      <Checkbox checked={defaultSelect} className="mt-1" />

      <div className="flex flex-col gap-1">
        <div className="font-semibold flex gap-1">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              form.setValue("title", e.currentTarget.innerText);
            }}
          >
            {title}
          </div>
          <div>(+ $9.9 USD)</div>
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            form.setValue("description", e.currentTarget.innerText);
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
