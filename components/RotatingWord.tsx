'use client';

import { useEffect, useState } from 'react';

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const HOLD_MS = 1400;

export default function RotatingWord({ words }: { words: readonly string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const id = setTimeout(
      () => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
      },
      deleting ? DELETE_SPEED : TYPE_SPEED
    );
    return () => clearTimeout(id);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="rotating-word">
      {text}
      <span className="rotating-word-cursor">|</span>
    </span>
  );
}
