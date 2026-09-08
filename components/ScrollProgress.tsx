'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setPercent(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-bar-track" aria-hidden="true">
      <div className="scroll-bar-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
