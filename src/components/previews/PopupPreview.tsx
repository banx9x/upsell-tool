import { schema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import CloseIcon from "../icons/CloseIcon";
import { Product } from "@/lib/types";
import { useAppContext } from "@/AppContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function PopupPreview() {
  const { product, form } = useAppContext();
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

      <div className="space-y-4 p-2">
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            form.setValue("popup.description", e.currentTarget.innerText);
          }}
        >
          {description}
        </div>

        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {product!.images.map((image) => (
              <CarouselItem key={image.id}>
                <img
                  src={image.src}
                  alt={product!.title}
                  className="block w-full rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-0" />
          <CarouselPrevious className="left-0" />
        </Carousel>
      </div>
    </div>
  );
}
