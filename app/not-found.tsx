import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero container" style={{ minHeight: '60vh' }}>
      <p className="cmd-line">
        <span className="cmd-prompt">$</span> cat 404.txt
      </p>
      <h1 className="hero-title">
        404<span className="cursor"></span>
      </h1>
      <p className="hero-text">
        bash: page: command not found. Cette route n&apos;existe pas (ou plus).
      </p>
      <div className="hero-actions center">
        <Link href="/" className="btn btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
