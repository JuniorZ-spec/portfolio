import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section container" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '6rem' }}>
      <p className="eyebrow">ERREUR 404</p>
      <h1 className="proj-detail-title" style={{ margin: '0.6rem auto 1.2rem' }}>
        Page <span className="accent-text">introuvable</span>
      </h1>
      <p className="proj-detail-desc" style={{ margin: '0 auto 2rem' }}>
        Cette page n&apos;existe pas ou plus.
      </p>
      <Link href="/" className="btn btn-primary btn-pill magnetic">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
