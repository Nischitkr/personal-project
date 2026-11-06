import { useState, useEffect, useRef } from 'react';

/**
 * Hook to trigger a momentary visual bounce animation whenever a value changes.
 * Returns boolean `isBouncing` that lasts for `durationMs`.
 */
export function useValueBounce<T>(value: T, durationMs: number = 300): boolean {
  const [isBouncing, setIsBouncing] = useState(false);
  const isFirstMount = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setIsBouncing(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsBouncing(false);
    }, durationMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, durationMs]);

  return isBouncing;
}
