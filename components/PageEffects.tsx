'use client';

import { useEffect } from 'react';

export default function PageEffects() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => revealObserver.observe(el));
    };
    observeAll();

    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const strength = 18;
    const magnets = new Map<HTMLElement, { onMove: (e: MouseEvent) => void; onLeave: () => void }>();

    const attachMagnets = () => {
      document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
        if (magnets.has(el)) return;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
        };
        const onLeave = () => {
          el.style.transform = 'translate(0, 0)';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        magnets.set(el, { onMove, onLeave });
      });
    };
    attachMagnets();
    const magnetObserver = new MutationObserver(attachMagnets);
    magnetObserver.observe(document.body, { childList: true, subtree: true });

    const tilts = new Map<HTMLElement, { onMove: (e: MouseEvent) => void; onLeave: () => void }>();
    const attachTilts = () => {
      document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
        if (tilts.has(el)) return;
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          el.style.transform = `perspective(700px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateZ(4px)`;
        };
        const onLeave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        tilts.set(el, { onMove, onLeave });
      });
    };
    attachTilts();
    const tiltObserver = new MutationObserver(attachTilts);
    tiltObserver.observe(document.body, { childList: true, subtree: true });

    const onSpotlightMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('.spotlight');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    document.addEventListener('mousemove', onSpotlightMove);

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
      magnetObserver.disconnect();
      tiltObserver.disconnect();
      document.removeEventListener('mousemove', onSpotlightMove);
      magnets.forEach((handlers, el) => {
        el.removeEventListener('mousemove', handlers.onMove);
        el.removeEventListener('mouseleave', handlers.onLeave);
      });
      tilts.forEach((handlers, el) => {
        el.removeEventListener('mousemove', handlers.onMove);
        el.removeEventListener('mouseleave', handlers.onLeave);
      });
    };
  }, []);

  return null;
}
