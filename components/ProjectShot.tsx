'use client';

import { useEffect, useRef, useState } from 'react';

type ProjectShotProps = {
  src: string;
  alt: string;
  /** Image swapped in on hover, fetched only once the card is hovered or focused. */
  preview?: string;
  /** Screens that cycle by themselves (crossfade) while the card is on screen. */
  slides?: string[];
  fit?: 'cover' | 'contain';
  /** Letterbox color when fit is 'contain'. */
  bg?: string;
};

const SLIDE_MS = 3200;

export default function ProjectShot({ src, alt, preview, slides, fit = 'cover', bg }: ProjectShotProps) {
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);
  const wanted = useRef(false);
  const cycle = slides && slides.length > 1 ? slides : null;

  useEffect(() => {
    wanted.current = playing;
  }, [playing]);

  useEffect(() => {
    const el = rootRef.current;
    if (!cycle || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const run = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => setActive((i) => (i + 1) % cycle.length), SLIDE_MS);
    };
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? run() : window.clearInterval(timer)),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [cycle]);

  const start = () => {
    if (!preview) return;
    wanted.current = true;
    if (loaded.current) {
      setPlaying(true);
      return;
    }
    const probe = new Image();
    probe.onload = () => {
      loaded.current = true;
      if (wanted.current) setPlaying(true);
    };
    probe.src = preview;
  };
  const stop = () => {
    wanted.current = false;
    setPlaying(false);
  };

  const imgClass = `proj-shot${fit === 'contain' ? ' proj-shot-contain' : ''}`;

  if (cycle) {
    return (
      <div className="proj-window-body proj-slides" ref={rootRef}>
        {cycle.map((url, i) => (
          <img
            key={url}
            className={`${imgClass} proj-slide${i === active ? ' is-active' : ''}`}
            src={url}
            alt={i === 0 ? alt : ''}
            aria-hidden={i === active ? undefined : true}
            width={960}
            height={480}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <span className="proj-slide-dots" aria-hidden="true">
          {cycle.map((url, i) => (
            <i key={url} className={i === active ? 'is-active' : ''} />
          ))}
        </span>
      </div>
    );
  }

  return (
    <div className="proj-window-body" onPointerEnter={start} onPointerLeave={stop} onFocus={start} onBlur={stop}>
      <img
        className={imgClass}
        style={bg ? { background: bg } : undefined}
        src={playing && preview ? preview : src}
        alt={alt}
        width={960}
        height={480}
        loading="lazy"
      />
    </div>
  );
}
