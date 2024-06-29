import { useAppContext } from "@/AppContext";
import { Checkbox } from "../ui/checkbox";

export default function SimpleCheckboxPreview() {
  const { product, form } = useAppContext();
  const { defaultSelect, defaultSelectId, title, description } = form.watch();

  const variant = (product?.variants || []).find(
    (v) => String(v.id) == defaultSelectId
  );

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
          {variant && (
            <div className="text-indigo-500">(+ ${variant?.price} USD)</div>
          )}
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
