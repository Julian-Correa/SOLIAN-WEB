import { Check, Coffee, Lamp, Shirt, ShoppingBag, ShoppingCart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { DemoFrame } from './DemoFrame';
import { useDemoTick } from './useDemoTick';

interface Product {
  name: string;
  price: string;
  icon: LucideIcon;
}

const PRODUCTS: Product[] = [
  { name: 'Café de especialidad', price: '$8.900', icon: Coffee },
  { name: 'Remera de algodón', price: '$15.500', icon: Shirt },
  { name: 'Lámpara de mesa', price: '$24.000', icon: Lamp },
  { name: 'Mochila urbana', price: '$31.200', icon: ShoppingBag },
];

interface StoreDemoProps {
  active: boolean;
}

export function StoreDemo({ active }: StoreDemoProps) {
  const { tick } = useDemoTick(active, 1500);

  const cycle = tick % 5;
  const cartCount = tick % 4;
  const confirmed = cartCount === 3;

  return (
    <DemoFrame label="Tienda online" meta="Envío gratis" active={active}>
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 rounded-full bg-accent/15" />
            <span className="font-display text-[10px] font-bold text-petrolio">Mercado Local</span>
          </div>
          <div className="relative flex items-center gap-1">
            {cartCount > 0 ? (
              <span
                key={`add-${tick}`}
                className="demo-float-up absolute -top-3 right-4 font-sans text-[8px] font-bold text-accent"
              >
                +1
              </span>
            ) : null}
            <ShoppingCart className="h-3 w-3 text-petrolio" aria-hidden="true" />
            <span
              key={`cart-${cartCount}`}
              className="demo-bump inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-sans text-[8px] font-bold text-white"
            >
              {cartCount}
            </span>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5">
          {PRODUCTS.map((product, index) => (
            <div
              key={`${cycle}-${index}`}
              className="demo-fade-in flex min-h-0 flex-col justify-between rounded-lg bg-white p-1.5"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex h-7 items-center justify-center rounded-md bg-petrolio/5">
                <product.icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              </div>
              <div className="mt-1">
                <p className="truncate font-sans text-[9px] font-semibold leading-tight text-petrolio">
                  {product.name}
                </p>
                <p className="font-display text-[10px] font-bold leading-tight text-petrolio">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {confirmed ? (
          <div className="demo-pop-in flex items-center justify-center gap-1.5 rounded-lg bg-petrolio px-2 py-1.5">
            <Check className="h-3 w-3 text-accent" aria-hidden="true" />
            <span className="font-sans text-[9px] font-semibold text-cream">Compra confirmada</span>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5">
            <span className="font-sans text-[9px] text-slate">Carrito</span>
            <span className="font-sans text-[9px] font-semibold text-petrolio">
              {cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}
