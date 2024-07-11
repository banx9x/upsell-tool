import { useAppContext } from "@/AppContext";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";
import { getVariantImage } from "@/lib/utils";

export default function MultiCheckboxPreview() {
  const { product, form } = useAppContext();
  const { defaultSelect, defaultSelectId, title, label } = form.watch();

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
        <div className="text-indigo-500">
          (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              form.setValue("popup.triggerText", e.currentTarget.innerText);
            }}
          >
            More Information
          </span>
          )
        </div>
      </div>

      <div className="flex gap-2">
        {product!.variants.map((variant) => (
          <div key={variant.id} className="flex flex-col gap-2 items-center">
            <div className="font-bold">{variant.title}</div>
            <img
              src={getVariantImage(product!, variant.image_id).src}
              className={clsx("block w-40 h-40 rounded-lg", {
                "border-2 border-indigo-500":
                  defaultSelect && defaultSelectId == String(variant.id),
              })}
            />
            <p>{getVariantImage(product!, variant.image_id).alt as string}</p>

            <div className="font-semibold text-indigo-500">
              ${variant.price} USD
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex gap-1">
                <Checkbox
                  checked={
                    defaultSelect && String(variant.id) == defaultSelectId
                  }
                  className="mt-1"
                />
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
        ))}
      </div>
    </div>
  );
}
