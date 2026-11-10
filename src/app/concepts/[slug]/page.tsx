import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, getConcept } from "@/lib/concepts";
import { Footer } from "@/components/Sections";

// Every concept page is prerendered at build time, so waiting on params is fine here.
export const instant = false;

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/concepts/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getConcept(slug);
  if (!c) return {};
  const title = `${c.meta.title}, ${c.meta.kind}`;
  return {
    title,
    description: c.meta.summary,
    alternates: { canonical: `/concepts/${slug}` },
    openGraph: { title, description: c.meta.summary, images: [{ url: c.meta.cover.src, width: 1920, height: 1080 }] },
  };
}

export default async function ConceptPage({ params }: PageProps<"/concepts/[slug]">) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  const { meta, Content } = concept;

  const index = concepts.findIndex((c) => c.slug === slug);
  const next = concepts[(index + 1) % concepts.length];

  const facts = [
    { k: "Type", v: "Personal concept" },
    { k: "Year", v: meta.year },
    { k: "Tools", v: meta.tools },
    { k: "Fields", v: meta.fields },
  ];

  return (
    <main className="pt-14">
      <article className="mx-auto max-w-7xl px-4 sm:px-10 md:px-16">
        <header className="pt-16 md:pt-28">
          <Link href="/#concepts" className="font-mono text-sm text-muted transition hover:text-lime">
            ← all work
          </Link>
          <p className="mt-10 font-mono text-xs text-lime">concept · {meta.kind.toLowerCase()}</p>
          <h1 className="mt-4 text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-paper/75 md:text-2xl">{meta.summary}</p>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="bg-ink p-5">
                <dt className="font-mono text-xs text-dim">{f.k}</dt>
                <dd className="mt-2 text-sm leading-relaxed md:text-base">{f.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-14 overflow-hidden rounded-xl border border-line">
          <Image
            src={meta.cover.src}
            alt={meta.cover.alt}
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 1150px, 100vw"
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="pb-16 [&>p:first-child]:mt-14 [&>p:first-child]:text-xl [&>p:first-child]:text-paper md:[&>p:first-child]:text-2xl">
          <Content />
        </div>

        <p className="pb-24 font-mono text-xs text-dim">
          Also on{" "}
          <a href={meta.behance} target="_blank" rel="noreferrer" className="text-muted underline underline-offset-4 hover:text-lime">
            Behance ↗
          </a>
        </p>
      </article>

      <Link
        href={`/concepts/${next.slug}`}
        className="group block border-t border-line px-4 py-20 sm:px-10 md:px-16 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs text-muted">next concept</p>
          <p className="mt-3 text-5xl font-medium tracking-tight transition group-hover:text-lime md:text-7xl">
            {next.meta.title} <span className="inline-block transition group-hover:translate-x-2">→</span>
          </p>
        </div>
      </Link>
      <Footer />
    </main>
  );
}
