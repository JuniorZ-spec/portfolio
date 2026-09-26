import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="section container"
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        paddingTop: '6rem',
      }}
    >
      <div>
        <p className="eyebrow">ERREUR 404</p>
        <h1 className="proj-detail-title" style={{ margin: '0.6rem auto 1.2rem' }}>
          Page <span className="accent-text">introuvable</span>
        </h1>
        <p className="proj-detail-desc" style={{ margin: '0 auto 2rem', maxWidth: '40rem' }}>
          Le lien est cassé ou la page a été déplacée. Vous pouvez repartir sur l&apos;accueil
          ou consulter mes projets et réalisations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary btn-pill magnetic">
            Retour à l&apos;accueil
          </Link>
          <Link href="/projects" className="btn btn-secondary btn-pill">
            Voir les projets
          </Link>
        </div>
      </div>
    </section>
  );
}
