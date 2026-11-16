import { BadgeCheck, FileText, Package, ShoppingCart, Truck, UserPlus, type LucideIcon } from 'lucide-react';

export interface ActivityItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

export const ACTIVITY_TEMPLATES: Array<Omit<ActivityItem, 'key'>> = [
  { label: 'Nuevo cliente registrado', icon: UserPlus },
  { label: 'Pedido recibido', icon: ShoppingCart },
  { label: 'Pago confirmado', icon: BadgeCheck },
  { label: 'Actualización de inventario', icon: Package },
  { label: 'Envío despachado', icon: Truck },
  { label: 'Factura emitida', icon: FileText },
];

const TIMES = ['ahora', 'hace 2 min', 'hace 5 min', 'hace 8 min'];

interface ActivityFeedProps {
  items: ActivityItem[];
  animate: boolean;
}

export function ActivityFeed({ items, animate }: ActivityFeedProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.12em] text-cream/40">
          Actividad reciente
        </span>
        <span className="hidden font-sans text-[8px] text-cream/30 sm:inline">en vivo</span>
      </div>

      <ul className="mt-1 space-y-1">
        {items.map((item, index) => (
          <li
            key={item.key}
            className={`flex h-6 items-center gap-2 rounded-md bg-cream/[0.04] px-2 ${
              animate ? 'dash-slide-in' : ''
            }`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-cream/10 text-cream/60">
              <item.icon className="h-2.5 w-2.5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1 truncate font-sans text-[9px] font-medium text-cream/80">
              {item.label}
            </span>
            <span className="hidden shrink-0 font-sans text-[8px] text-cream/35 sm:inline">
              {TIMES[index] ?? 'hace 12 min'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
