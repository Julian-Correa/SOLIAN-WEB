import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, TrendingUp, Users, Wallet } from 'lucide-react';
import { ActivityFeed, ACTIVITY_TEMPLATES, type ActivityItem } from './ActivityFeed';
import { KpiCard } from './KpiCard';
import { SalesChart } from './SalesChart';
import { prefersReducedMotion, useInView } from './useInView';

interface KpiState {
  sales: number;
  clients: number;
  orders: number;
  growth: number;
}

type FlashState = Record<keyof KpiState, number>;

const KPI_BASE: KpiState = {
  sales: 2_450_000,
  clients: 128,
  orders: 86,
  growth: 18.5,
};

const FLASH_BASE: FlashState = { sales: 0, clients: 0, orders: 0, growth: 0 };

const formatCurrency = (value: number) => `$${Math.round(value).toLocaleString('es-AR')}`;
const formatInteger = (value: number) => Math.round(value).toLocaleString('es-AR');
const formatPercent = (value: number) => `+${value.toFixed(1).replace('.', ',')}%`;

const INITIAL_FEED: ActivityItem[] = ACTIVITY_TEMPLATES.slice(0, 4).map((item, index) => ({
  ...item,
  key: `inicial-${index}`,
}));

export function Dashboard() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [reduced, setReduced] = useState(false);
  const [kpis, setKpis] = useState(KPI_BASE);
  const [flash, setFlash] = useState(FLASH_BASE);
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [chartCycle, setChartCycle] = useState(0);
  const feedCursor = useRef(ACTIVITY_TEMPLATES.length - 4);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!inView || reduced) {
      return;
    }

    let timer = 0;
    let cancelled = false;
    let ticks = 0;

    const schedule = (delay: number) => {
      timer = window.setTimeout(run, delay);
    };

    const rotateFeed = () => {
      const template = ACTIVITY_TEMPLATES[feedCursor.current % ACTIVITY_TEMPLATES.length];
      const id = feedCursor.current;
      feedCursor.current += 1;
      setFeed((previous) =>
        [
          { ...template, key: `${template.label}-${id}` },
          ...previous.filter((item) => item.label !== template.label),
        ].slice(0, 4),
      );
    };

    const run = () => {
      if (cancelled) {
        return;
      }

      if (document.visibilityState === 'hidden') {
        schedule(2400);
        return;
      }

      ticks += 1;

      if (ticks % 8 === 0) {
        setChartCycle((cycle) => cycle + 1);
      }

      if (Math.random() < 0.55) {
        const options = ['sales', 'orders', 'clients'] as const;
        const which = options[Math.floor(Math.random() * options.length)];

        setKpis((previous) => {
          if (which === 'sales') {
            return { ...previous, sales: previous.sales + 15000 * (1 + Math.floor(Math.random() * 2)) };
          }
          if (which === 'orders') {
            return { ...previous, orders: previous.orders + 1 };
          }
          return { ...previous, clients: previous.clients + 1 };
        });
        setFlash((previous) => ({ ...previous, [which]: previous[which] + 1 }));
      } else {
        rotateFeed();
      }

      schedule(1700 + Math.random() * 1500);
    };

    schedule(2800 + Math.random() * 900);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, reduced]);

  const animate = inView && !reduced;
  const hidden = !inView && !reduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`select-none ${animate ? 'dash-fade' : ''}`}
      style={hidden ? { opacity: 0 } : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-cream/25" />
            <span className="h-2 w-2 rounded-full bg-cream/25" />
            <span className="h-2 w-2 rounded-full bg-cream/25" />
          </div>
          <span className="ml-1 flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full bg-accent ${animate ? 'dash-blink' : ''}`}
            />
            <span className="font-display text-sm font-semibold text-cream">Panel de gestión</span>
          </span>
        </div>

        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className={`h-2.5 w-[2px] origin-bottom rounded-full bg-accent/70 ${
                animate ? 'dash-eq' : ''
              }`}
              style={{ animationDelay: `${bar * 160}ms` }}
            />
          ))}
        </span>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-1.5">
        <KpiCard
          label="Ventas del mes"
          value={kpis.sales}
          format={formatCurrency}
          icon={Wallet}
          delay={0}
          enabled={animate}
          flashKey={flash.sales}
        />
        <KpiCard
          label="Clientes activos"
          value={kpis.clients}
          format={formatInteger}
          icon={Users}
          delay={90}
          enabled={animate}
          flashKey={flash.clients}
        />
        <KpiCard
          label="Pedidos"
          value={kpis.orders}
          format={formatInteger}
          icon={ShoppingBag}
          delay={180}
          enabled={animate}
          flashKey={flash.orders}
        />
        <KpiCard
          label="Crecimiento"
          value={kpis.growth}
          format={formatPercent}
          icon={TrendingUp}
          delay={270}
          enabled={animate}
          flashKey={flash.growth}
        />
      </div>

      <div className="mt-2.5">
        <SalesChart cycle={chartCycle} animate={animate} />
      </div>

      <div className="mt-2.5">
        <ActivityFeed items={feed} animate={animate} />
      </div>
    </div>
  );
}
