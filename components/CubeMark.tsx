import type { CSSProperties } from 'react';

export default function CubeMark({ size = 22 }: { size?: number }) {
  const style = { width: size, height: size, '--cube-r': `${size / 2}px` } as CSSProperties;
  return (
    <span className="brand-cube" style={style} aria-hidden="true">
      <span className="brand-cube-inner">
        <span className="brand-cube-face brand-cube-front" />
        <span className="brand-cube-face brand-cube-back" />
        <span className="brand-cube-face brand-cube-right" />
        <span className="brand-cube-face brand-cube-left" />
        <span className="brand-cube-face brand-cube-top" />
        <span className="brand-cube-face brand-cube-bottom" />
      </span>
    </span>
  );
}
