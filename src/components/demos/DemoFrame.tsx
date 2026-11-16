import type { ReactNode } from 'react';

interface DemoFrameProps {
  label: string;
  meta?: string;
  active: boolean;
  children: ReactNode;
}

export function DemoFrame({ label, meta, active, children }: DemoFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-[272px] select-none overflow-hidden rounded-xl border border-petrolio/10 bg-cream transition-opacity duration-500 ${
        active ? 'opacity-100' : 'demo-paused opacity-75'
      }`}
    >
      <div className="flex h-7 items-center justify-between border-b border-petrolio/10 bg-white px-2.5">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-petrolio/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-petrolio/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-petrolio/20" />
          <span className="ml-1 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-slate">
            {label}
          </span>
        </div>
        {meta ? <span className="font-sans text-[9px] text-slate">{meta}</span> : null}
      </div>
      <div className="h-[calc(100%-1.75rem)] overflow-hidden p-2.5">{children}</div>
    </div>
  );
}
