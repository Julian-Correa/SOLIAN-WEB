import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

interface DemoTick {
  tick: number;
  reduced: boolean;
}

export function useDemoTick(active: boolean, intervalMs = 1700): DemoTick {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const update = () => setDocumentVisible(document.visibilityState === 'visible');

    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (reduced || !active || !documentVisible) {
      return;
    }

    const id = window.setInterval(() => {
      setTick((value) => value + 1);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, documentVisible, intervalMs, reduced]);

  return { tick: reduced ? 3 : tick, reduced };
}
