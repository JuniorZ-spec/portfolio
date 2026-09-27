'use client';

import { useEffect, useState } from 'react';

export default function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Africa/Porto-Novo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="live-clock" aria-hidden="true">
      {time ? `GMT+1 ${time}` : ''}
    </span>
  );
}
