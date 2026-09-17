'use client';

import { useEffect, useRef, useState } from 'react';

const CHAR_MS = 18;
const LINE_PAUSE_MS = 350;
const LOOP_PAUSE_MS = 2200;

export default function TerminalTyping({ lines }: { lines: string[] }) {
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.current.push(id);
    };

    const runLoop = () => {
      let lineIndex = 0;
      let charIndex = 0;
      const step = () => {
        if (lineIndex >= lines.length) {
          schedule(() => {
            setDone([]);
            setCurrent('');
            lineIndex = 0;
            charIndex = 0;
            schedule(step, CHAR_MS);
          }, LOOP_PAUSE_MS);
          return;
        }
        const line = lines[lineIndex];
        if (charIndex <= line.length) {
          setCurrent(line.slice(0, charIndex));
          charIndex++;
          schedule(step, CHAR_MS);
        } else {
          setDone((d) => [...d, line]);
          setCurrent('');
          lineIndex++;
          charIndex = 0;
          schedule(step, LINE_PAUSE_MS);
        }
      };
      step();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !running.current) {
            running.current = true;
            runLoop();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [lines]);

  return (
    <div ref={ref}>
      {done.map((line, i) => (
        <p key={`${line}-${i}`} className="proj-detail-cmd">
          {line}
        </p>
      ))}
      {current && (
        <p className="proj-detail-cmd">
          {current}
          <span className="terminal-cursor" />
        </p>
      )}
    </div>
  );
}
