import { TrendingUp, Wrench } from 'lucide-react';
import { DemoFrame } from './DemoFrame';
import { useDemoTick } from './useDemoTick';

const STATUS_LABELS = ['Pendiente', 'En proceso', 'Finalizado'];
const STATUS_STYLES = [
  'bg-petrolio/10 text-petrolio',
  'bg-accent/15 text-accent',
  'bg-petrolio text-cream',
];

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const ORDERS = [
  { vehicle: 'Fiat Cronos', plate: 'AB 123 CD' },
  { vehicle: 'VW Gol Trend', plate: 'AC 456 EF' },
  { vehicle: 'Renault Kangoo', plate: 'AD 789 GH' },
];

const formatArs = (value: number) => `$${value.toLocaleString('es-AR')}`;

interface WorkshopDemoProps {
  active: boolean;
}

export function WorkshopDemo({ active }: WorkshopDemoProps) {
  const { tick } = useDemoTick(active, 1800);

  const activeDay = tick % DAYS.length;
  const appointments = 1 + (tick % 4);
  const income = 380000 + ((tick * 23) % 90) * 1000;
  const jobs = 9 + (tick % 7);
  const progress = 35 + ((tick * 17) % 55);

  return (
    <DemoFrame label="Panel del taller" meta={`${appointments} turnos`} active={active}>
      <div className="flex h-full flex-col gap-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <div key={`income-${tick}`} className="demo-flash rounded-lg bg-white px-2 py-1.5">
            <p className="flex items-center gap-1 font-sans text-[8px] uppercase tracking-[0.12em] text-slate">
              <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" />
              Ingresos
            </p>
            <p className="mt-0.5 font-display text-[13px] font-bold leading-none text-petrolio">
              {formatArs(income)}
            </p>
          </div>

          <div key={`jobs-${tick}`} className="demo-flash rounded-lg bg-white px-2 py-1.5">
            <p className="flex items-center gap-1 font-sans text-[8px] uppercase tracking-[0.12em] text-slate">
              <Wrench className="h-2.5 w-2.5" aria-hidden="true" />
              Trabajos
            </p>
            <p className="mt-0.5 font-display text-[13px] font-bold leading-none text-petrolio">
              {jobs}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 rounded-lg bg-white px-1.5 py-1.5">
          {DAYS.map((day, index) => {
            const isActiveDay = index === activeDay;

            return (
              <div
                key={`${day}-${index}`}
                className={`flex flex-col items-center rounded-md py-1 ${
                  isActiveDay ? 'bg-accent/10 ring-1 ring-accent/40' : ''
                }`}
              >
                <span
                  className={`font-sans text-[8px] font-semibold ${
                    isActiveDay ? 'text-accent' : 'text-slate'
                  }`}
                >
                  {day}
                </span>
                <span
                  className={`mt-1 h-1 w-1 rounded-full ${
                    isActiveDay ? 'demo-pulse-soft bg-accent' : 'bg-petrolio/15'
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center gap-1">
          {ORDERS.map((order, index) => {
            const statusIndex = (tick + index) % STATUS_LABELS.length;

            return (
              <div
                key={`${tick}-${index}`}
                className="demo-fade-in flex items-center justify-between gap-2 rounded-lg bg-white px-2 py-1.5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="min-w-0">
                  <p className="truncate font-sans text-[10px] font-semibold leading-tight text-petrolio">
                    {order.vehicle}
                  </p>
                  <p className="font-sans text-[8px] leading-tight text-slate">{order.plate}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 font-sans text-[8px] font-semibold uppercase tracking-wide ${STATUS_STYLES[statusIndex]}`}
                >
                  {STATUS_LABELS[statusIndex]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg bg-white px-2 py-1.5">
          <div className="flex items-center justify-between font-sans text-[8px] text-slate">
            <span>Orden en curso</span>
            <span className="font-semibold text-petrolio">{progress}%</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-petrolio/10">
            <div
              className="demo-bar h-full rounded-full bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
