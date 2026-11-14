interface LogoProps {
  tone?: 'light' | 'dark';
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}

export function Logo({
  tone = 'light',
  markClassName = 'h-10 w-10',
  wordmarkClassName = 'h-8',
  showWordmark = true,
}: LogoProps) {
  const color = tone === 'light' ? '#1f2d2a' : '#f5f4f0';

  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 190 155"
        className={markClassName}
        role="img"
        aria-label="SOLIAN"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0, 0)">
          <g transform="translate(-19, -8)">
            <path d="M 169.0,31.0 L 166.0,27.0 L 130.0,9.0 L 124.0,8.0 L 21.0,57.0 L 19.0,60.0 L 19.0,98.0 L 21.0,101.0 L 67.0,124.0 L 76.0,122.0 L 101.0,109.0 L 82.0,98.0 L 51.0,83.0 L 53.0,81.0 L 104.0,58.0 L 146.0,37.0 L 165.0,36.0 Z" fill={color} />
            <path d="M 175.0,87.0 L 133.0,65.0 L 128.0,66.0 L 103.0,78.0 L 101.0,81.0 L 112.0,88.0 L 145.0,104.0 L 147.0,106.0 L 66.0,145.0 L 35.0,145.0 L 21.0,158.0 L 18.0,161.0 L 130.0,161.0 L 174.0,132.0 Z" fill="#e16a1f" />
          </g>
        </g>
      </svg>
      {showWordmark ? (
        <div className="flex flex-col leading-none">
          <span
            className={`font-display font-extrabold tracking-wide ${wordmarkClassName}`}
            style={{ color }}
          >
            SOLIAN
          </span>
          <span
            className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color }}
          >
            Desarrollo de Software
          </span>
        </div>
      ) : null}
    </div>
  );
}
