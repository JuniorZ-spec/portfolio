'use client';

import { useEffect, useRef, useState } from 'react';

export default function StatCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const duration = 1200;
            const start = performance.now();

            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              setValue(Math.floor(progress * target));
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setValue(target);
              }
            };

            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <>
      <span className="stat-number" ref={ref}>
        {value}
      </span>
      <span className="stat-suffix">{suffix}</span>
    </>
  );
}
