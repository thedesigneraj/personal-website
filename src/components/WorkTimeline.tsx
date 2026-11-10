"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

export type TimelineItem = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  timeline: string;
  marker: string;
  tags: string[];
  cover: ReactNode;
};

/**
 * Work as a winding path: a serpentine line draws itself as you scroll, a comet rides
 * its tip, each project's node lights up as it's reached, and cards alternate sides.
 */
export function WorkTimeline({ items }: { items: TimelineItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const svg = el.querySelector<SVGSVGElement>("[data-svg]")!;
      const track = el.querySelector<SVGPathElement>("[data-track]")!;
      const draw = el.querySelector<SVGPathElement>("[data-draw]")!;

      // Build the serpentine path through every node, swinging out between them.
      const build = () => {
        const box = el.getBoundingClientRect();
        const pts = [...el.querySelectorAll<HTMLElement>("[data-node]")].map((n) => {
          const r = n.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        });
        if (pts.length < 2) return;
        const mobile = box.width < 768;
        const swing = mobile ? 16 : Math.min(box.width * 0.17, 240);
        let d = `M ${pts[0].x} ${Math.max(0, pts[0].y - 140)} L ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const off = swing * (i % 2 ? 1 : -1);
          const span = b.y - a.y;
          d += ` C ${a.x + off} ${a.y + span * 0.4}, ${b.x + off} ${b.y - span * 0.4}, ${b.x} ${b.y}`;
        }
        const last = pts[pts.length - 1];
        d += ` L ${last.x} ${last.y + 140}`;
        svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
        track.setAttribute("d", d);
        draw.setAttribute("d", d);
      };
      build();

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(draw, { strokeDashoffset: 0 });
        el.querySelectorAll("[data-node]").forEach((n) => n.classList.add("is-on"));
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);

        // The line draws and the comet rides its tip, both tied to scroll.
        const path = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 75%", scrub: 0.6 },
          defaults: { ease: "none" },
        });
        path
          .fromTo(draw, { strokeDashoffset: 1 }, { strokeDashoffset: 0 }, 0)
          .fromTo(q("[data-comet]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, 0)
          .to(
            q("[data-comet]"),
            { motionPath: { path: draw, align: draw, alignOrigin: [0.5, 0.5] } },
            0,
          );

        // Rebuild the curve whenever layout changes, then refresh the comet's path.
        const onRefresh = () => {
          build();
          path.invalidate();
        };
        ScrollTrigger.addEventListener("refreshInit", onRefresh);

        // Nodes light up as the line reaches them.
        q("[data-node]").forEach((node) => {
          // Stay lit once the line has passed; switch off only when scrolling back above.
          ScrollTrigger.create({
            trigger: node,
            start: "top 62%",
            onEnter: () => node.classList.add("is-on"),
            onLeaveBack: () => node.classList.remove("is-on"),
          });
        });

        // Cards unfold into view from their side.
        q("[data-entry]").forEach((entry, i) => {
          const card = entry.querySelector("[data-card]");
          const ghost = entry.querySelector("[data-ghost]");
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 90,
              x: fromLeft ? -40 : 40,
              rotate: fromLeft ? -3 : 3,
              clipPath: "inset(18% 6% 18% 6% round 16px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotate: 0,
              clipPath: "inset(0% 0% 0% 0% round 16px)",
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: entry, start: "top 80%", toggleActions: "play none none reverse" },
            },
          );
          if (ghost) {
            gsap.fromTo(
              ghost,
              { yPercent: 40 },
              { yPercent: -40, ease: "none", scrollTrigger: { trigger: entry, start: "top bottom", end: "bottom top", scrub: true } },
            );
          }
        });

        return () => ScrollTrigger.removeEventListener("refreshInit", onRefresh);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // Gentle 3D tilt toward the cursor (mouse only).
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const t = e.currentTarget.querySelector<HTMLElement>("[data-tilt]");
    if (!t) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(t, { rotateY: px * 8, rotateX: -py * 8, duration: 0.5, ease: "power3.out" });
  };
  const untilt = (e: PointerEvent<HTMLElement>) => {
    const t = e.currentTarget.querySelector<HTMLElement>("[data-tilt]");
    if (t) gsap.to(t, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <div ref={root} className="relative mt-16 md:mt-24">
      <svg data-svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="comet-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path data-track fill="none" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="2 10" strokeLinecap="round" />
        <path data-draw pathLength={1} fill="none" stroke="var(--color-lime)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="0" />
        <circle data-comet r="6" fill="var(--color-lime)" filter="url(#comet-glow)" style={{ visibility: "hidden" }} />
      </svg>

      <ol className="relative">
        {items.map((it, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={it.slug}
              data-entry
              className="relative grid items-center gap-6 py-12 pl-12 md:grid-cols-2 md:gap-28 md:py-20 md:pl-0"
            >
              {/* Node on the path */}
              <span
                data-node
                className={`timeline-node absolute top-20 left-5 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:left-1/2 ${it.marker === "Now" ? "is-now" : ""}`}
              >
                <span className="dot" />
              </span>

              {/* Card */}
              <div className={left ? "md:order-1" : "md:order-2"}>
                <p className="mb-3 font-mono text-xs text-lime md:hidden">{it.marker}</p>
                <Link
                  href={`/work/${it.slug}`}
                  data-card
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                  className="group block [perspective:1000px]"
                >
                  <div data-tilt className="[transform-style:preserve-3d]">
                    <div className="overflow-hidden rounded-xl ring-1 ring-transparent transition duration-500 group-hover:shadow-[0_30px_80px_-30px_rgba(200,242,58,0.4)] group-hover:ring-lime/60">
                      <div className="transition duration-700 group-hover:scale-[1.03]">{it.cover}</div>
                    </div>
                    <div className="pt-6">
                      <p className="font-mono text-xs text-muted">
                        {it.role} · {it.timeline}
                      </p>
                      <h3 className="mt-2 text-3xl font-medium tracking-tight transition group-hover:text-lime md:text-4xl">
                        {it.title}
                      </h3>
                      <p className="mt-2 text-paper/70">{it.summary}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {it.tags.map((t) => (
                          <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto inline-flex items-center gap-2 font-mono text-sm text-lime">
                          read <span className="transition group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Big outlined marker on the other side (desktop) */}
              <div className={`hidden md:block ${left ? "md:order-2 text-left" : "md:order-1 text-right"}`} aria-hidden>
                <p
                  data-ghost
                  className="text-[clamp(5rem,11vw,10rem)] leading-none font-medium tracking-[-0.05em]"
                  style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(200,242,58,0.35)" }}
                >
                  {it.marker}
                </p>
                <p className="mt-3 font-mono text-xs text-muted">{it.timeline}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
