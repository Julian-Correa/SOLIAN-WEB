import { AlertTriangle } from 'lucide-react';
import { DemoFrame } from './DemoFrame';
import { useDemoTick } from './useDemoTick';

const LEVELS = [24, 21, 17, 13, 9, 6, 4, 8, 12, 16];
const MAX_LEVEL = 24;

const ITEMS = [
  { name: 'Filtro de aceite', offset: 0 },
  { name: 'Pastillas de freno', offset: 3 },
  { name: 'Aceite 5W-40', offset: 6 },
  { name: 'Bujías', offset: 8 },
];

interface InventoryDemoProps {
  active: boolean;
}

export function InventoryDemo({ active }: InventoryDemoProps) {
  const { tick } = useDemoTick(active, 1600);

  const rows = ITEMS.map((item) => {
    const stock = LEVELS[(tick + item.offset) % LEVELS.length];
    const nextStock = LEVELS[(tick + 1 + item.offset) % LEVELS.length];
    const delta = nextStock - stock;
    const critical = stock <= 4;
    const low = !critical && stock <= 9;

    return { ...item, stock, delta, critical, low };
  });

  const criticalRow = rows.find((row) => row.critical);

  return (
    <DemoFrame label="Inventario" meta="Sincronizado" active={active}>
      <div className="flex h-full flex-col gap-1.5">
        <div
          className={`flex h-5 items-center gap-1.5 rounded-md px-1.5 ${
            criticalRow ? 'demo-pulse-soft bg-accent/10 ring-1 ring-accent/30' : ''
          }`}
        >
          {criticalRow ? (
            <>
              <AlertTriangle className="h-2.5 w-2.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="truncate font-sans text-[8px] font-semibold text-accent">
                Stock mínimo: {criticalRow.name}
              </span>
            </>
          ) : (
            <span className="font-sans text-[8px] text-slate">Sin alertas de stock</span>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between">
          {rows.map((row, index) => {
            const width = Math.min(100, (row.stock / MAX_LEVEL) * 100);
            const badge = row.critical
              ? 'bg-accent text-white'
              : row.low
                ? 'bg-accent/15 text-accent'
                : 'bg-petrolio/10 text-petrolio';
            const label = row.critical ? 'Crítico' : row.low ? 'Bajo' : 'Normal';
            const barColor = row.critical ? 'bg-accent' : row.low ? 'bg-accent/60' : 'bg-petrolio/40';

            return (
              <div
                key={`${tick}-${index}`}
                className="demo-fade-in flex items-center gap-1.5 rounded-md bg-white px-1.5 py-1"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="min-w-0 flex-1 truncate font-sans text-[9px] font-semibold text-petrolio">
                  {row.name}
                </span>
                <span className="h-1 w-8 shrink-0 overflow-hidden rounded-full bg-petrolio/10">
                  <span
                    className={`demo-bar block h-full rounded-full ${barColor}`}
                    style={{ width: `${width}%` }}
                  />
                </span>
                <span className="w-4 shrink-0 text-right font-sans text-[9px] font-bold text-petrolio">
                  {row.stock}
                </span>
                <span className="relative h-3 w-5 shrink-0">
                  {row.delta !== 0 ? (
                    <span
                      key={`delta-${tick}-${index}`}
                      className={`demo-float-up absolute inset-0 text-center font-sans text-[8px] font-bold ${
                        row.delta > 0 ? 'text-petrolio' : 'text-accent'
                      }`}
                    >
                      {row.delta > 0 ? `+${row.delta}` : row.delta}
                    </span>
                  ) : null}
                </span>
                <span
                  className={`w-11 shrink-0 rounded-full px-1 py-0.5 text-center font-sans text-[8px] font-semibold ${badge}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </DemoFrame>
  );
}
