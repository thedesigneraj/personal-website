/**
 * Sudharsan AJ logo: an "A" folded like a paper plane and a lime "J" that sweeps
 * under it and rises to a parachute, which hangs on three thin lines tied to the
 * top of the J. Drawn on a 68×68 grid.
 *
 * tone="dark"  → for dark backgrounds (the site)
 * tone="light" → for light backgrounds
 * tile         → include the dark rounded tile (app icon look)
 * lines        → parachute lines (leave off below ~40px, they're too fine to see)
 * animated     → the parachute sways on its lines (off for reduced motion)
 */
export const LOGO = {
  tile: { x: 2, y: 2, size: 64, r: 14 },
  left: "26.2,13 11.5,52.5 24.5,44.5",
  right: "26.8,14.5 28.5,44 40.5,52.5",
  // one continuous stroke: straight down, then a single round hook
  j: "M51.8 29 V46 C 51.8 53.5 46 58.6 38.8 58.6 C 32.5 58.6 27.6 55.7 25.8 52.6",
  lines: "M43 18 L51.8 29 M60.6 18 L51.8 29 M51.8 18 L51.8 29",
  dome: "M42.9 18 A 8.9 7 0 0 1 60.7 18 Z",
};

const palettes = {
  dark: { tile: "#0d0d0e", left: "#ededE8", right: "#a9a9a1", lime: "#c8f23a" },
  light: { tile: "#0d0d0e", left: "#0d0d0e", right: "#5c5c58", lime: "#6b8a00" },
};

export function LogoMark({
  tone = "dark",
  tile = false,
  lines = true,
  animated = false,
  className = "",
  title = "Sudharsan AJ",
}: {
  tone?: "dark" | "light";
  tile?: boolean;
  lines?: boolean;
  animated?: boolean;
  className?: string;
  title?: string;
}) {
  const c = palettes[tone];
  const t = LOGO.tile;
  // Without the tile, crop to the artwork, leaving room for the parachute to sway.
  const viewBox = tile ? "0 0 68 68" : "8 8 58 56";
  return (
    <svg viewBox={viewBox} className={`${animated ? "logo-animated" : ""} ${className}`} role="img" aria-label={title}>
      {tile && <rect x={t.x} y={t.y} width={t.size} height={t.size} rx={t.r} fill={c.tile} />}
      <polygon points={LOGO.left} fill={c.left} />
      <polygon points={LOGO.right} fill={c.right} />
      <path d={LOGO.j} fill="none" stroke={c.lime} strokeWidth="5" strokeLinecap="round" />
      <g className="logo-chute">
        {lines && <path d={LOGO.lines} stroke={c.lime} strokeWidth="0.7" strokeLinecap="round" />}
        <path d={LOGO.dome} fill={c.lime} />
      </g>
    </svg>
  );
}
