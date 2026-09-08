'use client';

import { useEffect, useRef, useState } from 'react';

export default function ProficiencyBar({ level }: { level: number }) {
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            requestAnimationFrame(() => setWidth(level));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="proficiency-track" ref={trackRef}>
      <div className="proficiency-fill" style={{ width: `${width}%` }}></div>
    </div>
  );
}
