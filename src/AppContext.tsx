import { zodResolver } from '@hookform/resolvers/zod';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Toaster } from './components/ui/sonner';
import { FormValues, schema } from './lib/schema';
import { Product } from './lib/types';

export type AppState = {
  product: Product | null;
};

export type AppContextObject = {
  state: AppState;
  form: UseFormReturn<FormValues>;
  dispatch: React.Dispatch<AppContextAction>;
};

export const AppContext = createContext({} as AppContextObject);

export type AppContextAction = {
  type: 'setProduct';
  payload: Product | null;
};

const appReducer = (state: AppState, action: AppContextAction) => {
  switch (action.type) {
    case 'setProduct':
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider');
  }

  const { state, form, dispatch } = context;
  const { product } = state;
  const { defaultSelect, defaultSelectId } = form.watch();

  const setProduct = (product: Product) => {
    dispatch({ type: 'setProduct', payload: product });
  };

  const reset = () => {
    form.reset();
    dispatch({ type: 'setProduct', payload: null });
  };

  const defaultVariant = useMemo(() => {
    return (
      defaultSelect &&
      defaultSelectId &&
      product?.variants.find((v) => String(v.id) == defaultSelectId)
    );
  }, [product, defaultSelect, defaultSelectId]);

  return { ...state, defaultVariant, form, setProduct, reset };
};

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, { product: null });
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isMultiVariant: false,
      upsellOnProductPage: true,
      upsellOnCartPage: false,
      layout: 'checkbox',
      defaultSelect: true,
      defaultSelectId: undefined,
      quantityRule: 'DEFAULT',
      quantity: 1,
      showQuantity: true,
      sku: [],
      title: 'Mua đi mua đi',
      description:
        'Mô tả gì đó thật là gợi đòn để khách thấy hứng thú và mua sản phẩm',
      label: 'I want this',
      popup: {
        triggerText: 'More Information',
        title: 'Mua mua mua đi',
        description:
          'Mô tả gì đó thật là gợi đòn để khách thấy hứng thú và mua sản phẩm',
      },
    },
  });

  return (
    <AppContext.Provider value={{ state, form, dispatch }}>
      {children}
      <Toaster position='top-center' />
    </AppContext.Provider>
  );
};
