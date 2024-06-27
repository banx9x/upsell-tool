import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { schema } from "@/lib/schema";
import { Skeleton } from "../ui/skeleton";

type VariantPreviewProps = {
  form: UseFormReturn<z.infer<typeof schema>>;
};

export default function VariantPreview({ form }: VariantPreviewProps) {
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
        <div>(+ $9.9 USD)</div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="bg-zinc-300 w-24 h-24" />
        <Skeleton className="bg-zinc-300 w-24 h-24" />
        <Skeleton className="bg-zinc-300 w-24 h-24" />
        <Skeleton className="bg-zinc-300 w-24 h-24" />
        <Skeleton className="bg-zinc-300 w-24 h-24" />
        <Skeleton className="bg-zinc-300 w-24 h-24" />
      </div>
    </div>
  );
}
