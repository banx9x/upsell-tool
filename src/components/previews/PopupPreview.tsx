import { schema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import CloseIcon from "../icons/CloseIcon";

type PopupPreviewProps = {
  form: UseFormReturn<z.infer<typeof schema>>;
};

export default function PopupPreview({ form }: PopupPreviewProps) {
  const { popup: { title, description } = {} } = form.watch();
  return (
    <div className="flex flex-col gap-0 bg-white rounded-lg relative">
      <Button variant="ghost" size="icon" className="absolute right-0 top-0">
        <CloseIcon />
      </Button>
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          form.setValue("popup.title", e.currentTarget.innerText);
        }}
        className="font-semibold pb-2 pt-2 px-2 mr-10"
      >
        {title}
      </div>
      <hr />

      <div className="space-y-2 p-2">
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            form.setValue("popup.description", e.currentTarget.innerText);
          }}
        >
          {description}
        </div>

        <Skeleton className="w-full h-32 bg-zinc-300" />
      </div>
    </div>
  );
}
