import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useInView';

export function useCountUp(target: number, enabled: boolean, duration = 1100) {
  const reduced = useRef(prefersReducedMotion());
  const [display, setDisplay] = useState(reduced.current ? target : 0);
  const displayRef = useRef(display);
  const started = useRef(false);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    if (reduced.current) {
      setDisplay(target);
      started.current = true;
      return;
    }

    if (!enabled) {
      return;
    }

    const from = started.current ? displayRef.current : 0;
    const delta = target - from;
    started.current = true;

    if (Math.abs(delta) < 0.01) {
      setDisplay(target);
      return;
    }

    const durationMs = from === 0 ? duration : 380;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + delta * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, enabled, duration]);

  return display;
}
