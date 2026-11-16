import { useId } from 'react';

const LINE =
  'M10 34 C20 28 33 24 46.7 26 C60 28 70 32 83.3 30 C96 28 107 22 120 20 C133 18 144 24 156.7 23 C169 22 181 17 193.3 14 C205 11 219 10 230 9';
const AREA = `${LINE} L230 58 L10 58 Z`;
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface SalesChartProps {
  cycle: number;
  animate: boolean;
}

export function SalesChart({ cycle, animate }: SalesChartProps) {
  const gradientId = useId().replace(/:/g, '');

  return (
    <div
      className={`rounded-lg bg-cream/5 px-2.5 pb-1.5 pt-2 ring-1 ring-inset ring-cream/10 ${
        animate ? 'dash-fade' : ''
      }`}
      style={{ animationDelay: '120ms' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[8px] font-semibold uppercase tracking-[0.12em] text-cream/45">
          Ventas últimos 7 días
        </span>
        <span className="inline-flex items-center gap-1 font-sans text-[8px] font-semibold text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          +18,5%
        </span>
      </div>

      <svg
        viewBox="0 0 240 64"
        preserveAspectRatio="none"
        className="mt-1 h-16 w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e16a1f" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#e16a1f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[18, 38, 58].map((y) => (
          <line
            key={y}
            x1="10"
            x2="230"
            y1={y}
            y2={y}
            stroke="rgba(245, 244, 240, 0.08)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
        ))}

        <g key={cycle}>
          <path
            d={AREA}
            fill={`url(#${gradientId})`}
            className={animate ? 'dash-area' : ''}
          />
          <path
            d={LINE}
            fill="none"
            stroke="#e16a1f"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            className={animate ? 'dash-draw' : ''}
          />
          <circle
            cx="230"
            cy="9"
            r="2.5"
            fill="#f5f4f0"
            stroke="#e16a1f"
            strokeWidth="1.5"
            className={animate ? 'demo-pulse-soft' : ''}
          />
        </g>
      </svg>

      <div className="mt-0.5 flex justify-between px-[3px] font-sans text-[8px] font-medium text-cream/35">
        {DAYS.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
    </div>
  );
}
