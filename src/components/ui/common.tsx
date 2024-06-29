import { TwcComponentProps, twc } from "react-twc";
import { VariantProps, tv } from "tailwind-variants";

export const Container = twc.div`max-w-6xl mx-auto p-6 pt-12 font-nunito`;
export const Logo = twc.h1`font-bold text-4xl mb-6`;
export const SectionTitle = twc.h2`text-xl font-bold mb-5`;

export const spaceVariants = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    size: {
      sm: "gap-1",
      default: "gap-2",
      lg: "gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
  },
});
export type SpaceProps = TwcComponentProps<"div"> &
  VariantProps<typeof spaceVariants>;
export const Space = twc.div<SpaceProps>(({ orientation, size }) =>
  spaceVariants({ orientation, size })
);
