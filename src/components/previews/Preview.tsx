import { useAppContext } from "@/AppContext";
import { twc } from "react-twc";
import { SectionTitle, Space } from "../ui/common";
import CheckboxPreview from "./CheckboxPreview";
import MultiCheckboxPreview from "./MultiCheckboxPreview";
import SimpleCheckboxPreview from "./SimpleCheckboxPreview";
import VariantPreview from "./VariantPreview";
import { useMemo } from "react";
import PopupPreview from "./PopupPreview";

const PreviewWrapper = twc.div`bg-zinc-50 p-4 rounded-lg space-y-4`;

const LayoutPreviewWrapper = twc.div`p-3 bg-white border border-dashed border-zinc-200 rounded-lg min-h-16`;
const PopupPreviewWrapper = twc.div`rounded-lg min-h-48 bg-zinc-400/50 p-3`;
const BlockQuote = twc.blockquote`bg-indigo-100/50 border-l-4 border-indigo-400 p-3`;

export default function Preview() {
  const { product, form } = useAppContext();

  const { layout } = form.watch();

  const layoutPreview =
    layout == "simple-checkbox" ? (
      <SimpleCheckboxPreview />
    ) : layout == "checkbox" ? (
      <CheckboxPreview />
    ) : layout == "multi-checkbox" ? (
      <MultiCheckboxPreview />
    ) : layout == "variant" ? (
      <VariantPreview />
    ) : null;

  const hasPopupPreview = useMemo(
    () => layout == "checkbox" || layout == "multi-checkbox",
    [layout]
  );

  return (
    <PreviewWrapper onClick={(e) => e.preventDefault()}>
      <SectionTitle>Preview</SectionTitle>

      <Space orientation="vertical">
        <BlockQuote>
          <p>Có thể bấm vào (một số) text để chỉnh sửa nội dung cho phù hợp</p>
        </BlockQuote>

        <BlockQuote>
          <p>
            Để hiển thị giá trong nội dung mô tả, hãy đặt text{" "}
            <code>[price]</code> và <code>[compare-price]</code> trong mô tả nhé
          </p>
        </BlockQuote>
      </Space>

      <Space orientation="vertical" size="lg">
        {layout && (
          <Space orientation="vertical">
            <h3>Giao diện upsell sẽ như thế này nè</h3>

            <LayoutPreviewWrapper>{layoutPreview}</LayoutPreviewWrapper>
          </Space>
        )}

        {hasPopupPreview && (
          <Space orientation="vertical">
            <h3>Giao diện popup (more infomation) sẽ như thế này nè</h3>

            <PopupPreviewWrapper>
              <PopupPreview />
            </PopupPreviewWrapper>
          </Space>
        )}
      </Space>
    </PreviewWrapper>
  );
}
