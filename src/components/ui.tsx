import type { ReactNode } from "react";

/** Image slot with a clear label. Swap for <Image> once you have the screenshot. */
export function Placeholder({
  label,
  ratio = "16/10",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative flex w-full items-end overflow-hidden rounded-xl border border-dashed border-line bg-panel ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <figcaption className="relative m-4 rounded-md bg-ink/80 px-3 py-2 font-mono text-xs text-muted">
        <span className="text-lime">img</span> · {label}
      </figcaption>
    </figure>
  );
}

/** Two placeholders side by side, for iterations. */
export function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="my-10 grid gap-4 md:grid-cols-2">
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Before</p>
        <Placeholder label={before} ratio="4/3" />
      </div>
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-lime">After</p>
        <Placeholder label={after} ratio="4/3" />
      </div>
    </div>
  );
}

/** Content you still need to write. Visible on purpose so nothing ships half-done. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <span className="my-1 inline-block rounded border border-dashed border-lime/50 bg-lime/5 px-2 py-0.5 font-mono text-[0.8em] text-lime">
      [TODO: {children}]
    </span>
  );
}

export function NdaNote({ text }: { text?: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
      {text ?? "Client work under NDA. Visuals recreated, details changed."}
    </p>
  );
}

/** Highlights any "[TODO: …]" inside a plain string (used for meta fields). */
export function WithTodos({ text }: { text: string }) {
  const parts = text.split(/(\[TODO[^\]]*\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[TODO") ? (
          <span key={i} className="font-mono text-[0.85em] text-lime">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="my-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
      {items.map((s) => (
        <div key={s.label} className="bg-ink p-6">
          <p className="text-3xl font-medium tracking-tight text-lime md:text-4xl">
            <WithTodos text={s.value} />
          </p>
          <p className="mt-2 text-sm text-muted">
            <WithTodos text={s.label} />
          </p>
        </div>
      ))}
    </div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span className="text-lime">{index}</span> / {children}
    </p>
  );
}
