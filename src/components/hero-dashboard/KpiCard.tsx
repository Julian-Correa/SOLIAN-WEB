import type { LucideIcon } from 'lucide-react';
import { useCountUp } from './useCountUp';

interface KpiCardProps {
  label: string;
  value: number;
  format: (value: number) => string;
  icon: LucideIcon;
  delay: number;
  enabled: boolean;
  flashKey: number;
}

export function KpiCard({ label, value, format, icon: Icon, delay, enabled, flashKey }: KpiCardProps) {
  const display = useCountUp(value, enabled);

  return (
    <div
      className={`rounded-lg bg-cream/5 px-2.5 py-1.5 ring-1 ring-inset ring-cream/10 ${
        enabled ? 'dash-rise' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-1.5 text-cream/45">
        <Icon className="h-3 w-3 shrink-0" strokeWidth={1.75} />
        <span className="truncate font-sans text-[8px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div key={flashKey} className={`mt-1 rounded ${flashKey > 0 ? 'dash-flash' : ''}`}>
        <span className="block font-display text-[15px] font-bold leading-none tabular-nums text-cream">
          {format(display)}
        </span>
      </div>
    </div>
  );
}
