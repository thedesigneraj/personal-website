import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./ui";

/* Hand-drawn doodles. Each path draws itself when its <Reveal> scrolls into view. */
function Doodle({ children, className = "h-14 w-14" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`doodle text-lime ${className}`}
    >
      {children}
    </svg>
  );
}

const P = (d: string) => <path pathLength={1} d={d} />;

// Each doodle draws in, then loops a tiny motion (see the dz-* keyframes in globals.css).
const doodles = {
  clapper: (
    <>
      {P("M10 27 h44 v25 h-44 z")}
      {P("M18 38 h20 M18 45 h12")}
      <g className="dz-clap">
        {P("M10 27 l3 -12 h43 l-2 12")}
        {P("M22 15 l-4 12 M34 15 l-4 12 M46 15 l-4 12")}
      </g>
    </>
  ),
  edit: (
    <>
      {P("M8 12 h48 v30 h-48 z")}
      <g className="dz-pulse">{P("M27 20 l11 7 l-11 7 z")}</g>
      {P("M8 52 h48")}
      <g className="dz-scrub">{P("M12 47 v10")}</g>
    </>
  ),
  pencil: (
    <>
      <g className="dz-write">
        {P("M15 47 l3 -9 l28 -28 l6 6 l-28 28 z")}
        {P("M40 16 l6 6")}
      </g>
      <g className="dz-redraw">{P("M8 57 c8 -5 14 4 22 0 s14 -5 24 0")}</g>
    </>
  ),
  cap: (
    <>
      <g className="dz-toss">
        {P("M6 26 l26 -11 l26 11 l-26 11 z")}
        <g className="dz-tassel">{P("M58 26 v15 l-3 5")}</g>
      </g>
      {P("M17 31 v12 c9 7 21 7 30 0 v-12")}
    </>
  ),
  devices: (
    <>
      <g className="dz-buzz">
        {P("M10 10 h20 v38 h-20 z")}
        {P("M17 43 h6")}
      </g>
      {P("M32 26 h24 v18 h-24 z")}
      <g className="dz-type">{P("M36 32 h14 M36 38 h9")}</g>
      {P("M27 52 h34")}
    </>
  ),
  rocket: (
    <>
      <g className="dz-streaks">{P("M14 40 v8 M50 30 v8 M20 54 v6 M46 50 v6")}</g>
      <g className="dz-fly">
        {P("M32 7 c11 9 13 23 8 35 h-16 c-5 -12 -3 -26 8 -35 z")}
        {P("M32 20 a4 4 0 1 0 0.1 0")}
        {P("M24 34 l-8 11 l9 -3 M40 34 l8 11 l-9 -3")}
        <g className="dz-flame">{P("M28 46 c0 6 4 8 4 12 c0 -4 4 -6 4 -12")}</g>
      </g>
    </>
  ),
  camera: (
    <>
      {P("M8 22 h12 l4 -7 h16 l4 7 h12 v28 h-48 z")}
      <g className="dz-focus">{P("M32 28 a8 8 0 1 0 0.1 0")}</g>
      {P("M48 27 h3")}
      <g className="dz-flash">{P("M52 8 l-3 5 M58 12 l-5 3 M46 6 l0 5")}</g>
    </>
  ),
  arrow: (
    <>
      {P("M6 40 c10 -2 20 -12 30 -24")}
      {P("M28 14 l9 1 l-1 9")}
    </>
  ),
};

const frames = [
  { d: doodles.clapper, t: "Film sets", s: "Assistant Director at Eskimo Studios. ~8 TV ads." },
  { d: doodles.edit, t: "The edit room", s: "Fell for editing, VFX and animation." },
  { d: doodles.pencil, t: "Design", s: "Started making visual work for clients." },
  { d: doodles.cap, t: "Brighton, UK", s: "M.Sc. User Experience Design." },
  { d: doodles.devices, t: "Startups and clients", s: "FoodX in London, DataReveal for Walmart, and an HRMS for a Canadian client at NeurIX AI." },
  { d: doodles.rocket, t: "Founder", s: "Building SkalX. Research, design, code, ship." },
];

const badges = [
  "B.Sc. Visual Communication, DG Vaishnav",
  "Y Combinator Startup School 2026",
  "iTNT iAccelerate cohort 2026",
];

const wrap = "mx-auto max-w-7xl px-4 sm:px-10 md:px-16";

export function About() {
  return (
    <section id="about" className={`${wrap} scroll-mt-14 border-t border-line py-24 md:py-36`}>
      {/* Intro + portrait */}
      <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
        <Reveal>
          <SectionLabel index="03">about</SectionLabel>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
            From film sets to shipping code.
          </h2>
          <p className="mt-6 max-w-md text-xl text-paper/75">
            Hey, I&apos;m Sudharsan. Designer, founder, photographer. Here&apos;s the story in six frames.
          </p>
        </Reveal>
        <Reveal delay={120} className="relative mx-auto w-full max-w-sm">
          <div className="rotate-2 overflow-hidden rounded-xl border border-line">
            <Image
              src="/about/portrait.webp"
              alt="Portrait of Sudharsan AJ"
              width={1024}
              height={1024}
              sizes="(min-width: 768px) 384px, 90vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-10 left-1 flex items-end gap-1 text-lime md:-left-14">
            <span className="font-hand text-2xl">that&apos;s me</span>
            <Doodle className="h-12 w-12 -translate-y-6">{doodles.arrow}</Doodle>
          </div>
        </Reveal>
      </div>

      {/* Storyboard */}
      <ol className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {frames.map((f, i) => (
          <li key={f.t} className="bg-ink">
            <Reveal delay={(i % 3) * 120} className="flex h-full gap-5 p-6 sm:flex-col sm:gap-6 sm:p-8">
              <Doodle>{f.d}</Doodle>
              <div>
                <p className="font-mono text-xs text-dim">frame 0{i + 1}</p>
                <p className="mt-1 text-2xl font-medium tracking-tight">{f.t}</p>
                <p className="mt-1 text-muted">{f.s}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <ul className="mt-6 flex flex-wrap gap-2">
        {badges.map((b) => (
          <li key={b} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
            {b}
          </li>
        ))}
      </ul>

      {/* Off the clock */}
      <div className="mt-28 grid items-center gap-12 md:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <Doodle className="h-16 w-16">{doodles.camera}</Doodle>
          <h3 className="mt-6 text-3xl font-medium tracking-tight md:text-4xl">Off the clock.</h3>
          <p className="mt-3 max-w-xs text-lg text-paper/75">
            Photographer, traveller, and always after the next thing that scares me a little.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          <Polaroid src="/about/skydive.jpg" w={1600} h={1400} alt="Sudharsan skydiving in tandem above the Palm Jumeirah, Dubai" caption="13,000 ft above Dubai" tilt="-rotate-3" />
          <Polaroid src="/about/scuba.jpg" w={1600} h={1200} alt="Sudharsan scuba diving among a school of fish" caption="and then, underwater" tilt="rotate-2 mt-10" delay={150} />
        </div>
      </div>
    </section>
  );
}

function Polaroid({
  src,
  w,
  h,
  alt,
  caption,
  tilt,
  delay = 0,
}: {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  tilt: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <figure className={`${tilt} rounded-sm bg-paper p-2 pb-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition duration-500 hover:rotate-0 sm:p-3 sm:pb-0`}>
        <div className="aspect-square overflow-hidden">
          <Image src={src} alt={alt} width={w} height={h} sizes="(min-width: 768px) 340px, 45vw" className="h-full w-full object-cover" />
        </div>
        <figcaption className="py-2 text-center font-hand text-lg leading-tight text-ink sm:py-3 sm:text-2xl">{caption}</figcaption>
      </figure>
    </Reveal>
  );
}
