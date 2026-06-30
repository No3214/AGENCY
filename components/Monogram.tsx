export default function Monogram({
  name,
  accent,
  size = 64,
}: {
  name: string;
  accent: [string, string];
  size?: number;
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className="monogram"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </span>
  );
}
