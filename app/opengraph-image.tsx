import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d2622',
          backgroundImage:
            'linear-gradient(rgba(232,135,60,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232,135,60,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#e8873c',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          $ whoami
        </div>
        <div
          style={{
            display: 'flex',
            color: '#f3ede0',
            fontSize: 72,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          ZINZINDOHOUE Olivier Junior
        </div>
        <div
          style={{
            display: 'flex',
            color: '#f3ede0',
            fontSize: 32,
            marginTop: 24,
          }}
        >
          Ingénieur DevOps Junior | Développeur Full-Stack
        </div>
        <div
          style={{
            display: 'flex',
            color: '#9db3ae',
            fontSize: 22,
            marginTop: 40,
          }}
        >
          Kubernetes · Terraform · CI/CD · AWS · Azure
        </div>
      </div>
    ),
    { ...size }
  );
}
