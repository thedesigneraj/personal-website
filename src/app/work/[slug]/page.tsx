import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, works } from "@/lib/work";
import { Footer } from "@/components/Sections";
import { NdaNote, WithTodos } from "@/components/ui";
import { Cover } from "@/components/Covers";

// Every case study is prerendered at build time, so waiting on params is fine here.
export const instant = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: `${work.meta.title} case study`,
    description: work.meta.seoDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: `${work.meta.title} case study`, description: work.meta.seoDescription },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  const { meta, Content } = work;

  const index = works.findIndex((w) => w.slug === slug);
  const next = works[(index + 1) % works.length];

  const overview = [
    { k: "Role", v: meta.role },
    { k: "Timeline", v: meta.timeline + (meta.location ? ` · ${meta.location}` : "") },
    { k: "Tools", v: meta.tools },
    { k: "Team", v: meta.team },
  ];

  return (
    <main className="pt-14">
      <article className="mx-auto max-w-7xl px-4 sm:px-10 md:px-16">
        <header className="pt-16 md:pt-28">
          <Link href="/#work" className="font-mono text-sm text-muted transition hover:text-lime">
            ← all work
          </Link>
          <p className="mt-10 font-mono text-xs text-lime">
            case study 0{index + 1} · {meta.tags.join(" · ")}
          </p>
          <h1 className="mt-4 text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em]">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-paper/75 md:text-2xl">{meta.summary}</p>
          {meta.nda && (
            <div className="mt-8">
              <NdaNote text={meta.note} />
            </div>
          )}

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {overview.map((o) => (
              <div key={o.k} className="bg-ink p-5">
                <dt className="font-mono text-xs text-dim">{o.k}</dt>
                <dd className="mt-2 text-sm leading-relaxed md:text-base">
                  <WithTodos text={o.v} />
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-14">
          <Cover slug={slug} label={meta.cover} />
        </div>

        <div className="pb-24">
          <Content />
        </div>
      </article>

      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line px-4 py-20 sm:px-10 md:px-16 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs text-muted">next case study</p>
          <p className="mt-3 text-5xl font-medium tracking-tight transition group-hover:text-lime md:text-7xl">
            {next.meta.title} <span className="inline-block transition group-hover:translate-x-2">→</span>
          </p>
        </div>
      </Link>
      <Footer />
    </main>
  );
}
