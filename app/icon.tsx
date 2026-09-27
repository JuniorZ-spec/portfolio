import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#08090b',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 20,
            height: 20,
            borderRadius: 4,
            background: 'linear-gradient(140deg, #6aa5ff 0%, #2f6df0 60%, #123a94 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
