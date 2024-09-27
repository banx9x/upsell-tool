import { useAppContext } from '@/AppContext';
import { getVariantImage } from '@/lib/utils';
import { twc } from 'react-twc';
import { Checkbox } from '../ui/checkbox';

const Quantity = twc.div`inline-flex items-center border rounded-md self-start`;
const QuantityButton = twc.button`w-8 h-8 border-0`;
const QuantityInput = twc.span`w-8 border-0 text-center`;

export default function CheckboxPreview() {
  const { product, form } = useAppContext();
  const {
    defaultSelect,
    defaultSelectId,
    title,
    description,
    label,
    showQuantity,
    quantity,
    quantityRule,
  } = form.watch();

  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold flex gap-1'>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            form.setValue('title', e.currentTarget.innerText);
          }}>
          {title}
        </div>
        <div className='text-indigo-500'>
          (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              form.setValue('popup.triggerText', e.currentTarget.innerText);
            }}>
            More Information
          </span>
          )
        </div>
      </div>

      <div className='flex gap-2'>
        <img
          src={getVariantImage(product!, defaultSelectId).src}
          alt={product!.title}
          className='w-32 h-32 shrink-0 block rounded shadow'
        />

        <div className='flex flex-col justify-between'>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              form.setValue('description', e.currentTarget.innerText);
            }}>
            {description}
          </div>

          <div className='flex gap-1'>
            <Checkbox checked={defaultSelect} className='mt-1' />
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                form.setValue('label', e.currentTarget.innerText);
              }}>
              {label}
            </div>
          </div>

          {quantityRule === 'CUSTOM' && showQuantity && (
            <Quantity>
              <QuantityButton>-</QuantityButton>
              <QuantityInput>{quantity}</QuantityInput>
              <QuantityButton>+</QuantityButton>
            </Quantity>
          )}
        </div>
      </div>
    </div>
  );
}
