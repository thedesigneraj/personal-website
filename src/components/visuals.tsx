import Image from "next/image";
import type { ReactNode } from "react";

/* ---------- Shared ---------- */

/** A real screenshot with a caption. */
export function Shot({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-line">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1280px) 1150px, 100vw" className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A tall screenshot (e.g. a full landing page) inside a browser frame you can scroll. */
export function ScrollShot({
  src,
  alt,
  width,
  height,
  url,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  url: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-line bg-panel">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 rounded bg-ink px-2 py-0.5 font-mono text-xs text-muted">{url}</span>
          <span className="ml-auto font-mono text-xs text-dim">scroll ↕</span>
        </div>
        <div className="h-[70vh] max-h-[720px] overflow-y-auto overscroll-contain">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1280px) 1150px, 100vw" className="h-auto w-full" />
        </div>
      </div>
      {caption && <figcaption className="mt-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

/**
 * A use-case journey: context facts, how the person feels at each step,
 * what happens if things go differently, and the outcome. Horizontal on
 * desktop, a vertical timeline on phones.
 */
type Tone = "good" | "neutral" | "stress";
type Mood = "positive" | "negative" | "plain";
const toneRing: Record<Tone, string> = {
  good: "border-[#3fb96b] bg-[#3fb96b]/10 text-[#7ee2a0]",
  neutral: "border-[#5b7cff] bg-[#5b7cff]/10 text-[#a9bbff]",
  stress: "border-[#f0a64a] bg-[#f0a64a]/10 text-[#ffc983]",
};
const moodText: Record<Mood, string> = {
  positive: "text-[#7ee2a0]",
  negative: "text-[#ff8a7a]",
  plain: "text-muted",
};

export function UseCase({
  eyebrow,
  title,
  facts,
  steps,
  branches,
  outcome,
}: {
  eyebrow: string;
  title: string;
  facts: { k: string; v: string }[];
  steps: { label: string; feel: string; tone: Tone; mood: Mood }[];
  branches: { at: number; title: string; text: string }[];
  outcome: string;
}) {
  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-line bg-panel">
      <div className="border-b border-line p-6 md:p-8">
        <p className="font-mono text-xs tracking-widest text-lime uppercase">{eyebrow}</p>
        <p className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">{title}</p>
        <dl className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.k} className="flex gap-2 text-paper/80">
              <dt className="text-muted">{f.k}:</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="p-6 md:p-8">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Feels</p>
        <ol className="relative mt-6 space-y-5 md:grid md:gap-x-3 md:space-y-0" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {/* connector: vertical on phones, horizontal on desktop */}
          <span aria-hidden className="absolute top-5 bottom-5 left-5 border-l border-dashed border-line md:hidden" />
          <span aria-hidden className="absolute top-[3.6rem] right-[5%] left-[5%] hidden border-t border-dashed border-line md:block" />
          {steps.map((s, i) => (
            <li key={s.label} className="relative flex items-center gap-4 md:flex-col md:gap-3 md:text-center">
              <span className={`order-2 hidden text-xs font-medium md:order-none md:block ${moodText[s.mood]}`}>{s.feel}</span>
              <span className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 font-mono text-sm md:h-12 md:w-12 ${toneRing[s.tone]}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-snug md:px-1 md:text-[13px] md:text-balance">
                {s.label}
                <span className={`block text-xs md:hidden ${moodText[s.mood]}`}>{s.feel}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-10 font-mono text-xs tracking-widest text-muted uppercase">If things go differently</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {branches.map((b) => (
            <div key={b.at} className="rounded-lg border border-line bg-ink p-4">
              <p className="font-mono text-xs text-lime">at {String(b.at).padStart(2, "0")}</p>
              <p className="mt-2 font-medium">{b.title}</p>
              <p className="mt-1 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-lg border border-[#3fb96b]/40 bg-[#3fb96b]/10 p-4 text-sm text-paper/85">
          <span className="font-medium text-[#7ee2a0]">Outcome:</span> {outcome}
        </p>
      </div>
    </figure>
  );
}

/**
 * A user flow as stages left to right (swipe/scroll sideways). A stage is either
 * a sequence of steps, or a decision with two or more paths.
 */
type FlowTone = "blue" | "orange" | "green";
type FlowNode = { label: string; sub?: string; shape?: "box" | "pill" | "diamond"; tone: FlowTone; async?: boolean };
type FlowStage = {
  stage: string;
  nodes?: FlowNode[];
  decision?: { label: string; tone: FlowTone };
  paths?: { label: string; nodes: FlowNode[] }[];
  note?: string;
};
const flowTone: Record<FlowTone, string> = {
  blue: "border-[#5b7cff]/70 bg-[#5b7cff]/10 text-[#c7d3ff]",
  orange: "border-[#f0a64a]/70 bg-[#f0a64a]/10 text-[#ffd9a6]",
  green: "border-[#3fb96b]/70 bg-[#3fb96b]/10 text-[#b5f0c9]",
};

function FlowBox({ n }: { n: FlowNode }) {
  if (n.shape === "diamond") {
    return (
      <div className="flex justify-center py-5">
        <div className={`grid h-24 w-24 rotate-45 place-items-center rounded-md border-2 ${flowTone[n.tone]}`}>
          <span className="-rotate-45 px-1 text-center text-xs leading-tight font-medium">{n.label}</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`border-2 px-3 py-2.5 text-center ${n.shape === "pill" ? "rounded-full" : "rounded-lg"} ${n.async ? "border-dashed" : ""} ${flowTone[n.tone]}`}
    >
      <p className="text-sm leading-snug font-medium">{n.label}</p>
      {n.sub && <p className="mt-0.5 text-xs leading-snug opacity-75">{n.sub}</p>}
    </div>
  );
}

function FlowStack({ nodes }: { nodes: FlowNode[] }) {
  return (
    <div className="flex flex-col items-stretch">
      {nodes.map((n, i) => (
        <div key={n.label}>
          {i > 0 && (
            <div aria-hidden className={`mx-auto h-4 w-px ${n.async ? "border-l border-dashed border-muted" : "bg-muted/60"}`} />
          )}
          <FlowBox n={n} />
        </div>
      ))}
    </div>
  );
}

export function FlowMap({ stages, legend }: { stages: FlowStage[]; legend?: { tone: FlowTone; label: string }[] }) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto overscroll-x-contain rounded-xl border border-line bg-panel p-5 md:p-7">
        <ol className="flex w-max items-start gap-0">
          {stages.map((s, i) => (
            <li key={s.stage} className="flex items-start">
              {i > 0 && (
                <span aria-hidden className="mt-24 flex w-10 shrink-0 items-center text-muted">
                  <span className="h-px flex-1 bg-muted/60" />
                  <span className="-ml-1 text-sm">›</span>
                </span>
              )}
              <div className={s.paths ? "w-[440px]" : "w-[210px]"}>
                <p className="mb-4 font-mono text-[11px] tracking-widest text-lime uppercase">
                  {String(i + 1).padStart(2, "0")} · {s.stage}
                </p>
                {s.nodes && <FlowStack nodes={s.nodes} />}
                {s.nodes && s.decision && <div aria-hidden className="mx-auto h-4 w-px bg-muted/60" />}
                {s.decision && <FlowBox n={{ label: s.decision.label, tone: s.decision.tone, shape: "diamond" }} />}
                {s.paths && (
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    {s.paths.map((p) => (
                      <div key={p.label}>
                        <p className="mb-2 text-center font-mono text-[11px] text-muted">{p.label}</p>
                        <FlowStack nodes={p.nodes} />
                      </div>
                    ))}
                  </div>
                )}
                {s.note && <p className="mt-3 text-center font-mono text-[11px] text-muted">{s.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted">
        <span>scroll sideways →</span>
        {legend?.map((l) => (
          <span key={l.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm border-2 ${flowTone[l.tone]}`} />
            {l.label}
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span className="h-3 w-5 rounded-sm border-2 border-dashed border-muted" />
          done by the co-applicant
        </span>
      </figcaption>
    </figure>
  );
}

/** The core problem as a few big questions. */
export function BigQuestions({ items }: { items: string[] }) {
  return (
    <ol className="my-12 space-y-4 md:space-y-6">
      {items.map((q, i) => (
        <li key={q} className="flex items-baseline gap-4 md:gap-8">
          <span className="font-mono text-sm text-lime md:text-base">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-3xl leading-tight font-medium tracking-tight md:text-6xl">{q}</span>
        </li>
      ))}
    </ol>
  );
}

/** A row of short numbers or facts. */
export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="bg-ink p-6 md:p-8">
          <p className="text-4xl font-medium tracking-tight text-lime md:text-5xl">{s.value}</p>
          <p className="mt-2 text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/** Numbered design decisions, each with the problem it solves. */
export function DecisionGrid({ items }: { items: { title: string; text: string; solves: string }[] }) {
  return (
    <ol className="my-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((d, i) => (
        <li key={d.title} className="flex flex-col bg-ink p-6 md:p-7">
          <p className="font-mono text-2xl text-lime">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-4 text-xl font-medium tracking-tight">{d.title}</p>
          <p className="mt-2 flex-1 leading-relaxed text-paper/75">{d.text}</p>
          <p className="mt-5 font-mono text-xs text-lime/80">
            <span className="text-muted">solves:</span> {d.solves}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** A row of images (e.g. personas) that stacks on phones. */
export function ImageGrid({
  items,
  cols = 3,
}: {
  items: { src: string; alt: string; w: number; h: number; caption?: string }[];
  cols?: number;
}) {
  return (
    <div className="my-10 grid gap-4 sm:gap-6" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${Math.floor(1000 / cols)}px), 1fr))` }}>
      {items.map((it) => (
        <figure key={it.src}>
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="(min-width: 1024px) 380px, 100vw" className="h-auto w-full" />
          </div>
          {it.caption && <figcaption className="mt-3 font-mono text-xs text-muted">{it.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/**
 * App screens in phone frames: a grid on desktop, a swipeable row on phones.
 * Screens taller than the frame scroll inside it.
 */
export function PhoneGrid({
  items,
  cols = 4,
}: {
  items: { src: string; alt: string; label: string; h: number; w?: number }[];
  cols?: number;
}) {
  return (
    <figure className="mx-auto my-10" style={{ maxWidth: cols * 280 }}>
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {items.map((it) => {
          const w = it.w ?? 402;
          const tall = it.h / w > 874 / 402 + 0.02;
          return (
            <div key={it.src} className="w-[64%] shrink-0 snap-center sm:w-auto">
              <div className="relative aspect-[402/874] overflow-hidden rounded-[1.6rem] border-4 border-[#1d222c] bg-[#f4f6fa] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]">
                <div className={tall ? "h-full overflow-y-auto overscroll-contain" : "h-full"}>
                  <Image src={it.src} alt={it.alt} width={w} height={it.h} sizes="(min-width: 640px) 280px, 64vw" className="h-auto w-full" />
                </div>
                {tall && (
                  <span className="pointer-events-none absolute right-2 bottom-2 rounded-full bg-ink/85 px-2 py-0.5 font-mono text-[10px] text-paper">
                    scroll ↕
                  </span>
                )}
              </div>
              <p className="mt-3 text-center font-mono text-xs text-muted">{it.label}</p>
            </div>
          );
        })}
      </div>
    </figure>
  );
}

/** A live, clickable Figma prototype. Loads only when scrolled near. */
export function Prototype({ src, title }: { src: string; title: string }) {
  return (
    <figure className="my-10">
      <div className="aspect-[4/5] overflow-hidden rounded-xl border border-line bg-panel sm:aspect-[16/10]">
        <iframe src={src} title={title} loading="lazy" allowFullScreen className="h-full w-full" />
      </div>
      <figcaption className="mt-3 font-mono text-xs text-muted">
        <span className="text-lime">live prototype</span> · click through it right here. Built in Figma.
      </figcaption>
    </figure>
  );
}

/** Frame for anything rebuilt from memory for client work under NDA. */
export function Recreated({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-xl border border-line bg-panel p-4 sm:p-8">{children}</div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
        <span className="rounded border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-lime">
          recreated
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** Horizontal flow of steps, stacks on mobile. */
export function Flow({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="my-10 grid gap-3 md:grid-flow-col md:auto-cols-fr">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-xl border border-line bg-panel p-5">
          <p className="font-mono text-xs text-lime">0{i + 1}</p>
          <p className="mt-2 text-lg font-medium tracking-tight">{s.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
          {i < steps.length - 1 && (
            <span aria-hidden className="absolute -bottom-3 left-6 z-10 font-mono text-lime md:top-1/2 md:-right-3 md:bottom-auto md:left-auto md:-translate-y-1/2">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** A product decision shown as a shift from one idea to another. */
export function Shift({ n, from, to, children }: { n: string; from: string; to: string; children: ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-line p-6 md:p-8">
      <p className="font-mono text-xs text-lime">decision {n}</p>
      <div className="mt-4 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <p className="rounded-lg bg-panel px-4 py-3 text-paper/60 line-through decoration-dim">{from}</p>
        <span aria-hidden className="text-center font-mono text-lime">→</span>
        <p className="rounded-lg border border-lime/40 bg-lime/5 px-4 py-3 font-medium">{to}</p>
      </div>
      <div className="mt-5 max-w-[68ch] text-lg leading-relaxed text-paper/80">{children}</div>
    </div>
  );
}

export function Grid({ groups }: { groups: { label: string; items: string[] }[] }) {
  return (
    <div className="my-10 grid gap-3 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.label} className="rounded-xl border border-line p-5">
          <p className="font-mono text-xs text-muted">{g.label}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li key={it} className="rounded-md bg-panel px-3 py-1.5 text-sm">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ---------- DataReveal (recreated, fictional data) ---------- */

const kpis = [
  { k: "Revenue", v: "$4.82B", d: "+3.1%" },
  { k: "Operating cost", v: "$3.37B", d: "−1.4%" },
  { k: "Gross margin", v: "24.6%", d: "+0.6 pts" },
  { k: "Cash on hand", v: "$1.15B", d: "+2.2%" },
];
const bars = [38, 44, 41, 52, 49, 57, 55, 61, 58, 66, 63, 71];
const reports = [
  { n: "Q3 variance report", o: "FP&A", s: "Ready" },
  { n: "Store opex by region", o: "Ops finance", s: "Updated" },
  { n: "Supplier spend summary", o: "Procurement", s: "Review" },
];

export function FinanceDashboard() {
  return (
    <div className="flex min-w-0 gap-4 text-[11px] sm:text-xs">
      <aside className="hidden w-36 shrink-0 flex-col gap-1 rounded-lg border border-line p-3 sm:flex">
        <p className="mb-2 font-mono text-[10px] text-dim">finance analyzer</p>
        {["Overview", "Reports", "Analytics", "Ask AI", "Settings"].map((n, i) => (
          <span key={n} className={`rounded px-2 py-1.5 ${i === 0 ? "bg-lime/10 text-lime" : "text-muted"}`}>
            {n}
          </span>
        ))}
      </aside>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium sm:text-base">Overview · Q3</p>
          <span className="rounded border border-line px-2 py-1 font-mono text-[10px] text-muted">all regions ▾</span>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.k} className="rounded-lg border border-line p-3">
              <p className="text-muted">{k.k}</p>
              <p className="mt-1 text-base font-medium sm:text-lg">{k.v}</p>
              <p className="font-mono text-[10px] text-lime">{k.d}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-line p-3">
            <p className="text-muted">Revenue vs. cost, monthly</p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {bars.map((b, i) => (
                <span key={i} className="flex-1 rounded-sm bg-lime/70" style={{ height: `${b}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-lime/30 bg-lime/5 p-3">
            <p className="font-mono text-[10px] text-lime">AI insight</p>
            <p className="mt-2 leading-relaxed text-paper/80">
              Store opex in two regions rose faster than revenue this quarter. Open the variance report?
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-line">
          {reports.map((r, i) => (
            <div key={r.n} className={`flex items-center justify-between gap-2 px-3 py-2 ${i ? "border-t border-line" : ""}`}>
              <span className="truncate">{r.n}</span>
              <span className="hidden text-muted sm:inline">{r.o}</span>
              <span className="font-mono text-[10px] text-lime">{r.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DesignSystemSheet() {
  return (
    <div className="grid gap-4 text-xs md:grid-cols-3">
      <div className="rounded-lg border border-line p-4">
        <p className="font-mono text-[10px] text-dim">foundations</p>
        <div className="mt-3 flex gap-1.5">
          {["#c8f23a", "#ededE8", "#8a8a84", "#262624", "#141415"].map((c) => (
            <span key={c} className="h-8 flex-1 rounded border border-line" style={{ background: c }} />
          ))}
        </div>
        <p className="mt-4 text-2xl font-medium">Aa</p>
        <p className="text-muted">Display · Heading · Body · Caption</p>
      </div>
      <div className="rounded-lg border border-line p-4">
        <p className="font-mono text-[10px] text-dim">components</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded bg-lime px-3 py-1.5 text-ink">Primary</span>
          <span className="rounded border border-line px-3 py-1.5">Secondary</span>
          <span className="rounded px-3 py-1.5 text-muted">Ghost</span>
        </div>
        <div className="mt-3 rounded border border-line px-3 py-2 text-muted">Search reports…</div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-lime/10 px-2 py-0.5 text-lime">Ready</span>
          <span className="rounded-full bg-line px-2 py-0.5 text-muted">Draft</span>
          <span className="rounded-full border border-line px-2 py-0.5 text-muted">Review</span>
        </div>
      </div>
      <div className="rounded-lg border border-line p-4">
        <p className="font-mono text-[10px] text-dim">patterns</p>
        <div className="mt-3 rounded border border-line p-2">
          <p className="text-muted">KPI card</p>
          <p className="text-base font-medium">$0.00B</p>
        </div>
        <div className="mt-2 rounded border border-line p-2">
          <p className="text-muted">Chart card</p>
          <div className="mt-1 flex h-6 items-end gap-1">
            {[40, 70, 55, 90].map((h, i) => (
              <span key={i} className="flex-1 bg-lime/60" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between rounded border border-line p-2 text-muted">
          <span>Table row</span>
          <span>status</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- NeuriX AI (illustration only: the real designs are under NDA) ---------- */

const pipeline = [
  { col: "Applied", items: ["Candidate A · 82", "Candidate B · 76", "Candidate C · 64"] },
  { col: "Screened", items: ["Candidate D · 88", "Candidate E · 71"] },
  { col: "Assessment", items: ["Candidate F · 91"] },
  { col: "Shortlist", items: ["Candidate G · 94"] },
];

export function HrmsIllustration() {
  return (
    <div className="relative text-[10px] sm:text-xs">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium sm:text-base">Recruitment · Product Designer role</p>
        <span className="rounded border border-line px-2 py-1 font-mono text-[10px] text-muted">+ post a job</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {pipeline.map((c) => (
          <div key={c.col} className="rounded-lg border border-line p-2">
            <p className="mb-2 font-mono text-[10px] text-dim">{c.col}</p>
            <div className="space-y-1.5">
              {c.items.map((it) => {
                const [name, score] = it.split(" · ");
                return (
                  <div key={it} className="flex items-center justify-between gap-1 rounded bg-panel px-2 py-1.5">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="h-3 w-3 shrink-0 rounded-full bg-line" />
                      <span className="truncate text-muted">{name}</span>
                    </span>
                    <span className="font-mono text-lime">{score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 ml-auto w-[min(100%,18rem)] rounded-lg border border-lime/30 bg-lime/5 p-3">
        <p className="font-mono text-[10px] text-lime">AI assistant</p>
        <p className="mt-1 text-paper/80">3 candidates passed the assessment. Want me to shortlist them and draft interview invites?</p>
      </div>
    </div>
  );
}

/* ---------- FoodX (recreated) ---------- */

function Phone({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="aspect-[9/18] w-full overflow-hidden rounded-[1.5rem] border-2 border-[#3a3a38] bg-ink p-3 text-[9px] sm:text-[11px]">
        <div className="mx-auto mb-3 h-1 w-1/3 rounded-full bg-line" />
        {children}
      </div>
      <p className="mt-3 text-center font-mono text-xs text-muted">{title}</p>
    </div>
  );
}

export function FoodXScreens() {
  const found = ["Eggs", "Tomato", "Spinach", "Onion", "Cheese"];
  const recipes = [
    { n: "Spinach omelette", t: "12 min · uses 4 of yours" },
    { n: "Shakshuka", t: "20 min · uses 3 of yours" },
    { n: "Cheesy tomato toast", t: "8 min · uses 2 of yours" },
  ];
  const basket = ["🍅", "🧅", "🥬", "🥚", "🧀", "🍋"];
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3 sm:gap-6">
      <Phone title="scan your fridge">
        <p className="font-medium">What&apos;s in your fridge?</p>
        <div className="relative mt-3 aspect-[4/5] rounded-lg bg-panel">
          <span className="absolute inset-[12%] rounded border-2 border-dashed border-lime/60" />
          <span className="absolute top-[20%] left-[18%] rounded bg-lime px-1.5 py-0.5 text-[9px] text-ink">eggs</span>
          <span className="absolute top-[48%] right-[16%] rounded bg-lime px-1.5 py-0.5 text-[9px] text-ink">spinach</span>
          <span className="absolute bottom-[22%] left-[26%] rounded bg-lime px-1.5 py-0.5 text-[9px] text-ink">tomato</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {found.map((f) => (
            <span key={f} className="rounded-full border border-line px-2 py-0.5 text-muted">
              {f}
            </span>
          ))}
        </div>
      </Phone>
      <Phone title="recipes from what you have">
        <p className="font-medium">You can cook</p>
        <div className="mt-3 space-y-2">
          {recipes.map((r) => (
            <div key={r.n} className="rounded-lg border border-line p-2">
              <div className="mb-1.5 aspect-[16/7] rounded bg-gradient-to-br from-lime/50 to-lime/5" />
              <p className="font-medium">{r.n}</p>
              <p className="truncate text-muted">{r.t}</p>
            </div>
          ))}
        </div>
      </Phone>
      <Phone title="gamified basket">
        <p className="font-medium">Your basket</p>
        <div className="mt-3 rounded-lg bg-panel p-3 text-center">
          <div className="grid grid-cols-3 gap-1 text-lg sm:text-2xl">
            {basket.map((b, i) => (
              <span key={i} className={i > 3 ? "opacity-25" : ""}>
                {b}
              </span>
            ))}
          </div>
          <div className="mx-auto mt-2 h-6 w-4/5 rounded-b-2xl border-2 border-t-0 border-lime/70" />
        </div>
        <p className="mt-3 text-muted">4 of 6 collected</p>
        <div className="mt-1 h-1.5 rounded-full bg-line">
          <div className="h-full w-2/3 rounded-full bg-lime" />
        </div>
        <div className="mt-3 rounded-lg border border-lime/40 bg-lime/5 p-2 text-center text-lime">+20 points when you finish</div>
      </Phone>
    </div>
  );
}

export function ChecklistVsBasket() {
  return (
    <div className="grid gap-4 text-sm md:grid-cols-2">
      <div className="rounded-lg border border-line p-5">
        <p className="font-mono text-xs text-dim">the usual shopping list</p>
        <ul className="mt-4 space-y-2 text-muted">
          {["Tomatoes", "Onions", "Spinach", "Eggs"].map((i, n) => (
            <li key={i} className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded border border-line ${n < 2 ? "bg-line" : ""}`} />
              <span className={n < 2 ? "line-through" : ""}>{i}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-muted">Tick a box. Nothing else happens.</p>
      </div>
      <div className="rounded-lg border border-lime/40 p-5">
        <p className="font-mono text-xs text-lime">the basket concept</p>
        <div className="mt-4 flex items-end gap-2 text-2xl">
          <span>🍅</span>
          <span>🧅</span>
          <span className="opacity-25">🥬</span>
          <span className="opacity-25">🥚</span>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-line">
          <div className="h-full w-1/2 rounded-full bg-lime" />
        </div>
        <p className="mt-4 text-paper/80">Drop items into the basket, watch it fill up, earn points when you finish.</p>
      </div>
    </div>
  );
}
