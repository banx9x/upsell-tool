import { useAppContext } from "@/AppContext";
import clsx from "clsx";
import { Skeleton } from "../ui/skeleton";

export default function VariantPreview() {
  const { product, form } = useAppContext();
  const { defaultSelect, defaultSelectId, title, description, label } =
    form.watch();

  const variant = (product?.variants || []).find(
    (v) => String(v.id) == defaultSelectId
  );

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
        {defaultSelect && variant && (
          <div className="text-indigo-500">(+ ${variant.price} USD)</div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
        {product ? (
          <>
            {product.variants.map((variant) => {
              const image = product.images.find(
                (i) => i.id === variant.image_id
              );

              return (
                <img
                  key={variant.id}
                  src={image?.src}
                  alt={product.title}
                  className={clsx("w-full aspect-square rounded shadow", {
                    "border-2 border-indigo-500":
                      defaultSelect && defaultSelectId == String(variant.id),
                  })}
                />
              );
            })}
            <div className="w-full aspect-square rounded flex items-center justify-center text-2xl font-semibold uppercase text-center shadow">
              No, thank
            </div>
          </>
        ) : (
          <>
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
            <Skeleton className="bg-zinc-300 w-full aspect-square" />
          </>
        )}
      </div>
    </div>
  );
}
