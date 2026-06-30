export default function Marquee({ items, gold = false }: { items: string[]; gold?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${gold ? 'gold' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((it, i) => (
          <span className="marquee-item" key={i}>
            {it}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
