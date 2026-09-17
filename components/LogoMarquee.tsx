type Logo = { slug: string; name: string; src?: string };

export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const track = [...logos, ...logos];
  return (
    <div className="logo-marquee" aria-hidden="true">
      <div className="logo-marquee-track">
        {track.map((logo, i) => (
          <div className="logo-marquee-item" key={`${logo.slug}-${i}`}>
            <img
              src={logo.src ?? `https://cdn.simpleicons.org/${logo.slug}`}
              alt=""
              width={34}
              height={34}
            />
            <span>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
