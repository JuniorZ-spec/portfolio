'use client';

import { useEffect, useRef } from 'react';

const NODES = [
  { label: 'CLOUD', num: '01' },
  { label: 'IaC', num: '02' },
  { label: 'CI/CD', num: '03' },
  { label: 'OBSERVE', num: '04' },
];

const DURATION = 16;

export default function OrbitDiagram() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-x', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        el.style.setProperty('--tilt-y', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-tilt" ref={tiltRef}>
        <div className="orbit-ring orbit-ring-a" />
        <div className="orbit-ring orbit-ring-b" />
        <div className="orbit-center">
          <div className="orbit-cube">
            <span className="orbit-cube-face orbit-cube-front" />
            <span className="orbit-cube-face orbit-cube-back" />
            <span className="orbit-cube-face orbit-cube-right" />
            <span className="orbit-cube-face orbit-cube-left" />
            <span className="orbit-cube-face orbit-cube-top" />
            <span className="orbit-cube-face orbit-cube-bottom" />
          </div>
        </div>
        {NODES.map((n, i) => (
          <div
            className="orbit-arm"
            key={n.label}
            style={{ animationDelay: `${-(i * (DURATION / NODES.length))}s` }}
          >
            <div
              className="orbit-node"
              style={{ animationDelay: `${-(i * (DURATION / NODES.length))}s` }}
            >
              <span className="orbit-node-num">{n.num}</span>
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
