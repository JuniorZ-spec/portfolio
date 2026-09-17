const NODES = [
  { label: 'CLOUD', num: '01' },
  { label: 'IaC', num: '02' },
  { label: 'CI/CD', num: '03' },
  { label: 'OBSERVE', num: '04' },
];

const DURATION = 16;

export default function OrbitDiagram() {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-ring orbit-ring-a" />
      <div className="orbit-ring orbit-ring-b" />
      <div className="orbit-center">
        <span className="orbit-center-arrow">&gt;</span>
        <span className="orbit-center-label">DELIVERY</span>
      </div>
      {NODES.map((n, i) => (
        <div
          className="orbit-arm"
          key={n.label}
          style={{ animationDelay: `${-(i * (DURATION / NODES.length))}s` }}
        >
          <div
            className="orbit-node"
            style={{ animationDelay: `${-(i * (DURATION / NODES.length))}s` }}
          >
            <span className="orbit-node-num">{n.num}</span>
            {n.label}
          </div>
        </div>
      ))}
    </div>
  );
}
