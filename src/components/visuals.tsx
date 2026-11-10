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
