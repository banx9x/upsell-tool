import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { schema } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";

type CheckboxPreviewProps = {
  form: UseFormReturn<z.infer<typeof schema>>;
};

export default function CheckboxPreview({ form }: CheckboxPreviewProps) {
  const { defaultSelect, title, description, label } = form.watch();
  return (
    <div className="flex flex-col gap-2">
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
        <div>(More Infomation)</div>
      </div>

      <div className="flex gap-2">
        <Skeleton className="bg-zinc-300 w-32 h-32 shrink-0" />

        <div className="flex flex-col justify-between">
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              form.setValue("description", e.currentTarget.innerText);
            }}
          >
            {description}
          </div>

          <div className="flex gap-1">
            <Checkbox checked={defaultSelect} className="mt-1" />
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                form.setValue("label", e.currentTarget.innerText);
              }}
            >
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
