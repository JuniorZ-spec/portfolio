'use client';

import { useEffect, useState } from 'react';

type Line = { text: string; className?: string };

export default function Typewriter({
  lines,
  speed = 55,
  startDelay = 300,
}: {
  lines: Line[];
  speed?: number;
  startDelay?: number;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;

    const current = lines[lineIndex];
    const isTyping = charIndex < current.text.length;
    const delay = lineIndex === 0 && charIndex === 0 ? startDelay : isTyping ? speed : speed * 6;

    const timeout = setTimeout(() => {
      if (isTyping) {
        setCharIndex((c) => c + 1);
      } else {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [lineIndex, charIndex, lines, speed, startDelay]);

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={line.className}>
          {i < lineIndex ? line.text : i === lineIndex ? line.text.slice(0, charIndex) : ''}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
      <span className="cursor"></span>
    </>
  );
}
