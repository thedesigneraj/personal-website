import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { works } from "@/lib/work";
import { site } from "@/lib/site";
import { concepts } from "@/lib/concepts";
import { Reveal } from "./Reveal";
import { SectionLabel, WithTodos } from "./ui";
import { Cover } from "./Covers";

const wrap = "mx-auto max-w-7xl px-4 sm:px-10 md:px-16";

export function Work() {
  const [lead, ...rest] = works;
  return (
    <section id="work" className={`${wrap} scroll-mt-14 py-24 md:py-36`}>
      <Reveal>
        <SectionLabel index="01">selected work</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
          Three products, from first research to final screens.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-24 md:gap-24">
        <WorkCard work={lead} index={1} large />
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {rest.map((w, i) => (
            <WorkCard key={w.slug} work={w} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  work,
  index,
  large = false,
}: {
  work: (typeof works)[number];
  index: number;
  large?: boolean;
}) {
  const { meta, slug } = work;
  return (
    <Reveal>
      <Link href={`/work/${slug}`} className="group block">
        <div className="overflow-hidden rounded-xl transition duration-500 group-hover:-translate-y-1">
          <Cover slug={slug} label={meta.cover} />
        </div>
        <div className={`mt-6 ${large ? "md:flex md:items-end md:justify-between md:gap-10" : ""}`}>
          <div>
            <p className="font-mono text-xs text-muted">
              <span className="text-lime">0{index}</span> · {meta.role} · <WithTodos text={meta.timeline} />
            </p>
            <h3
              className={`mt-3 font-medium tracking-tight transition group-hover:text-lime ${
                large ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
              }`}
            >
              {meta.title}
            </h3>
            <p className="mt-3 max-w-xl text-lg text-paper/70">{meta.summary}</p>
          </div>
          <span className="mt-5 inline-flex shrink-0 items-center gap-2 font-mono text-sm text-lime">
            read case study <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Concepts() {
  return (
    <section id="concepts" className={`${wrap} scroll-mt-14 border-t border-line py-24 md:py-36`}>
      <Reveal>
        <SectionLabel index="02">concepts</SectionLabel>
        <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
          Side projects where I explore ideas.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        {concepts.map(({ slug, meta }, i) => (
          <Reveal key={slug} delay={i * 100}>
            <Link href={`/concepts/${slug}`} className="group block">
              <div className="overflow-hidden rounded-xl border border-line transition duration-500 group-hover:-translate-y-1">
                <Image
                  src={meta.cover.src}
                  alt={meta.cover.alt}
                  width={1920}
                  height={1080}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-5 font-mono text-xs text-muted">
                {meta.kind} · {meta.year}
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight transition group-hover:text-lime">
                {meta.title}
              </h3>
              <p className="mt-2 text-paper/70">{meta.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-lime">
                view concept <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Checked at build time, so the button never links to a missing file.
const hasResume = existsSync(join(process.cwd(), "public", site.resume));

export function Contact() {
  return (
    <section id="contact" className={`${wrap} scroll-mt-14 border-t border-line py-24 md:py-40`}>
      <Reveal>
        <SectionLabel index="04">contact</SectionLabel>
        <h2 className="mt-4 text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          Let&apos;s build
          <br />
          something <span className="text-lime">real.</span>
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-10 inline-block break-all text-2xl underline decoration-line underline-offset-8 transition hover:text-lime hover:decoration-lime md:text-4xl"
        >
          {site.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-line px-5 py-3 font-mono text-sm transition hover:border-lime hover:text-lime"
          >
            linkedin ↗
          </a>
          {hasResume && (
            <span className="inline-flex overflow-hidden rounded-md bg-lime font-mono text-sm text-ink">
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 transition hover:bg-paper"
              >
                view résumé ↗
              </a>
              <a
                href={site.resume}
                download="Sudharsan-AJ-Resume.pdf"
                aria-label="Download résumé as PDF"
                title="Download PDF"
                className="border-l border-ink/20 px-4 py-3 transition hover:bg-paper"
              >
                ↓
              </a>
            </span>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${wrap} flex flex-col justify-between gap-2 border-t border-line py-8 font-mono text-xs text-dim sm:flex-row`}>
      <p>
        © 2026 {site.name}
      </p>
      <p>designed and built by me, with AI · next.js on vercel</p>
    </footer>
  );
}
