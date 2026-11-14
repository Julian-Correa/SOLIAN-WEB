import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';

  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? 'text-cream' : 'text-petrolio'
        }`}
      >
        {title}
      </h2>
      {description ? <p className="mt-6 text-lg text-slate">{description}</p> : null}
    </Reveal>
  );
}
