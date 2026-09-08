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
          background: '#05070a',
          backgroundImage:
            'linear-gradient(rgba(59,157,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,157,255,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: '#ffb454',
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          $ whoami
        </div>
        <div
          style={{
            display: 'flex',
            color: '#3b9dff',
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
            color: '#e6f4ec',
            fontSize: 32,
            marginTop: 24,
          }}
        >
          Ingénieur DevOps Junior | Développeur Full-Stack
        </div>
        <div
          style={{
            display: 'flex',
            color: '#8fa39a',
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
