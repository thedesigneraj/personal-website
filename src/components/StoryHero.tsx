"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The five chapters shown on the rail and in the captions.
const chapters = [
  { key: "sketch", caption: "It starts on paper." },
  { key: "pixels", caption: "Then it becomes pixels." },
  { key: "product", caption: "Then a product people use." },
  { key: "code", caption: "Now I build it too, coding with AI." },
  { key: "ship", caption: "And I ship it." },
];

const flows = ["Ad Studio", "Brand Research", "Brand Studio"];

const codeLines = [
  { t: "// designed first. then built with AI.", c: "text-dim" },
  { t: "export default function AdStudio() {", c: "" },
  { t: "  const brand = useBrand()", c: "" },
  { t: "  const ideas = generate(brand)", c: "" },
  { t: "  return <Feed posts ads videos />", c: "text-lime" },
  { t: "}", c: "" },
];

const deployLines = [
  { t: "$ git push origin main", c: "text-paper" },
  { t: "▲ building…", c: "text-muted" },
  { t: "✓ compiled", c: "text-muted" },
  { t: "✓ deployed to production", c: "text-muted" },
  { t: "● skalx is live", c: "text-lime" },
  { t: "● first paying customer", c: "text-lime" },
];

export function StoryHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const caption = (i: number) => q(`[data-caption="${i}"]`);
        const dot = (i: number) => q(`[data-dot="${i}"]`);

        gsap.set(q("[data-scene]:not([data-scene='intro'])"), { autoAlpha: 0 });
        gsap.set(q("[data-scene='intro']"), { autoAlpha: 1 });
        gsap.set(q("[data-caption]"), { autoAlpha: 0, y: 16 });
        gsap.set(q(".ink"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q("[data-ui]"), { autoAlpha: 0, y: 12 });
        gsap.set(q("[data-phone]"), { xPercent: 0, scale: 0.7 });
        gsap.set(q("[data-line]"), { autoAlpha: 0, x: -8 });
        gsap.set(q("[data-final] > *"), { autoAlpha: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=700%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        // 0. Hello
        tl.to(q("[data-hint]"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(q("[data-first]"), { yPercent: -60, autoAlpha: 0 }, 0)
          .to(q("[data-aj]"), { scale: 1.25, color: "#c8f23a" }, 0)
          .to(q("[data-scene='intro']"), { autoAlpha: 0, scale: 0.92 }, 1)
          .to(q("[data-rail]"), { autoAlpha: 1, duration: 0.5 }, 1);

        // 1. Sketch on paper
        tl.fromTo(
          q("[data-scene='paper']"),
          { autoAlpha: 0, y: 60, rotate: -10 },
          { autoAlpha: 1, y: 0, rotate: -4 },
          1.2,
        )
          .to(caption(0), { autoAlpha: 1, y: 0, duration: 0.5 }, 1.4)
          .to(dot(0), { backgroundColor: "#c8f23a", duration: 0.2 }, 1.4)
          .to(q(".ink"), { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 }, 1.8);

        // 2. Pixels on a laptop
        tl.to(caption(0), { autoAlpha: 0, y: -16, duration: 0.4 }, 3.6)
          .to(q("[data-scene='paper']"), { scale: 0.55, rotate: 0, y: -20, autoAlpha: 0 }, 3.6)
          .fromTo(q("[data-scene='laptop']"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1 }, 3.7)
          .to(q("[data-ui]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.6 }, 4.2)
          .to(caption(1), { autoAlpha: 1, y: 0, duration: 0.5 }, 4.1)
          .to(dot(1), { backgroundColor: "#c8f23a", duration: 0.2 }, 4.1);

        // 3. Product screens
        tl.to(caption(1), { autoAlpha: 0, y: -16, duration: 0.4 }, 5.6)
          .to(q("[data-scene='laptop']"), { autoAlpha: 0, scale: 0.85 }, 5.6)
          .to(q("[data-scene='phones']"), { autoAlpha: 1, duration: 0.4 }, 5.8)
          .to(q("[data-phone='0']"), { xPercent: -112, scale: 1, rotate: -4 }, 5.9)
          .to(q("[data-phone='1']"), { scale: 1.06 }, 5.9)
          .to(q("[data-phone='2']"), { xPercent: 112, scale: 1, rotate: 4 }, 5.9)
          .to(caption(2), { autoAlpha: 1, y: 0, duration: 0.5 }, 6.1)
          .to(dot(2), { backgroundColor: "#c8f23a", duration: 0.2 }, 6.1);

        // 4. Code
        tl.to(caption(2), { autoAlpha: 0, y: -16, duration: 0.4 }, 7.6)
          .to(q("[data-phone]"), { xPercent: 0, rotate: 0, scale: 0.6, autoAlpha: 0 }, 7.6)
          .fromTo(q("[data-scene='code']"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1 }, 7.9)
          .to(q("[data-scene='code'] [data-line]"), { autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.4 }, 8.3)
          .to(caption(3), { autoAlpha: 1, y: 0, duration: 0.5 }, 8.1)
          .to(dot(3), { backgroundColor: "#c8f23a", duration: 0.2 }, 8.1);

        // 5. Ship
        tl.to(caption(3), { autoAlpha: 0, y: -16, duration: 0.4 }, 9.8)
          .to(q("[data-scene='code']"), { autoAlpha: 0, y: -40, scale: 0.95 }, 9.8)
          .fromTo(q("[data-scene='ship']"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 }, 10)
          .to(q("[data-scene='ship'] [data-line]"), { autoAlpha: 1, x: 0, stagger: 0.18, duration: 0.4 }, 10.4)
          .to(caption(4), { autoAlpha: 1, y: 0, duration: 0.5 }, 10.2)
          .to(dot(4), { backgroundColor: "#c8f23a", duration: 0.2 }, 10.2);

        // 6. Who I am now
        tl.to(caption(4), { autoAlpha: 0, duration: 0.4 }, 12)
          .to(q("[data-rail]"), { autoAlpha: 0, duration: 0.4 }, 12)
          .to(q("[data-scene='ship']"), { autoAlpha: 0, scale: 0.9 }, 12)
          .to(q("[data-scene='final']"), { autoAlpha: 1, duration: 0.1 }, 12.3)
          .to(q("[data-final] > *"), { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, 12.3)
          .to({}, { duration: 0.8 });

        // Pinning adds scroll height after the browser has already jumped to a #hash,
        // so jump again once the spacer exists (e.g. arriving at /#work from a case study).
        const hash = window.location.hash;
        if (hash && hash !== "#top") {
          const target = document.querySelector(hash);
          if (target) requestAnimationFrame(() => target.scrollIntoView());
        }
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-label="Intro"
      className="story relative h-svh w-full overflow-hidden bg-ink"
    >
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* 0. Intro */}
      <div
        data-scene="intro"
        className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-10 md:px-16"
      >
        <p className="font-mono text-sm text-muted">
          <span className="text-lime">~</span> hello, world. I&apos;m
        </p>
        <h1 className="mt-4 text-[clamp(3.5rem,14vw,12rem)] font-medium leading-[0.85] tracking-[-0.04em]">
          <span data-first className="block">Sudharsan</span>
          <span data-aj className="block origin-left">AJ</span>
        </h1>
        <p className="mt-6 font-mono text-sm text-muted">
          just call me AJ. {site.role.toLowerCase()}, {site.location.toLowerCase()}.
        </p>
      </div>

      {/* Stage holding the story scenes */}
      <div className="absolute inset-x-0 top-[12%] bottom-[22%] flex items-center justify-center px-4">
        <div className="relative h-full w-full max-w-[880px]">
          {/* 1. Paper */}
          <div
            data-scene="paper"
            className="absolute top-1/2 left-1/2 aspect-[3/4] h-[92%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-paper p-[6%] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <svg viewBox="0 0 300 400" className="h-full w-full" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path className="ink" pathLength={1} d="M10 20 H290" />
              <path className="ink" pathLength={1} d="M14 8 h40 M240 8 h46" />
              <path className="ink" pathLength={1} d="M14 50 H286 V170 H14 Z" />
              <path className="ink" pathLength={1} d="M14 50 L286 170 M286 50 L14 170" />
              <path className="ink" pathLength={1} d="M14 200 H220" />
              <path className="ink" pathLength={1} d="M14 222 H260 M14 240 H200" />
              <path className="ink" pathLength={1} d="M14 280 H140 V318 H14 Z" />
              <path className="ink" pathLength={1} d="M160 280 H286 V318 H160 Z" />
              <path className="ink" pathLength={1} d="M30 352 c30 -18 60 18 90 0 s60 -18 90 0" stroke="#c84a2a" />
              <path className="ink" pathLength={1} d="M230 340 l30 16 l-30 14" stroke="#c84a2a" />
            </svg>
          </div>

          {/* 2. Laptop */}
          <div
            data-scene="laptop"
            className="absolute top-1/2 left-1/2 aspect-[8/5] w-[min(100%,150vh)] max-h-full -translate-x-1/2 -translate-y-1/2"
          >
            <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              <rect x="100" y="16" width="600" height="390" rx="16" stroke="#3a3a38" strokeWidth="3" />
              <path d="M40 420 H760 L728 470 H72 Z" stroke="#3a3a38" strokeWidth="3" />
              <path d="M350 420 h100" stroke="#3a3a38" strokeWidth="3" />
            </svg>
            <div className="absolute top-[6.4%] left-[14.5%] flex h-[72%] w-[71%] gap-[3%] rounded-lg bg-panel p-[3%]">
              <div data-ui className="flex w-[22%] flex-col gap-2 rounded-md border border-line p-2">
                <span className="h-2 w-2/3 rounded bg-lime" />
                <span className="h-1.5 w-full rounded bg-line" />
                <span className="h-1.5 w-4/5 rounded bg-line" />
                <span className="h-1.5 w-full rounded bg-line" />
              </div>
              <div className="flex flex-1 flex-col gap-[4%]">
                <div data-ui className="h-[38%] rounded-md bg-gradient-to-br from-lime/80 to-lime/20" />
                <div className="flex h-[30%] gap-[4%]">
                  <div data-ui className="flex-1 rounded-md border border-line" />
                  <div data-ui className="flex-1 rounded-md border border-line" />
                  <div data-ui className="flex-1 rounded-md border border-line" />
                </div>
                <div data-ui className="h-[12%] w-1/3 rounded-full bg-paper" />
              </div>
            </div>
          </div>

          {/* 3. Phones */}
          <div data-scene="phones" className="absolute inset-0 flex items-center justify-center">
            {flows.map((flow, i) => (
              <div
                key={flow}
                data-phone={i}
                className="absolute aspect-[9/19] w-[28%] rounded-[1.2rem] sm:w-auto sm:h-[94%] sm:max-w-[30%] sm:rounded-[1.6rem] border-2 border-[#3a3a38] bg-panel p-[3%]"
                style={{ zIndex: i === 1 ? 2 : 1 }}
              >
                <div className="mx-auto mb-3 h-1.5 w-1/3 rounded-full bg-line" />
                <p className="font-mono text-[clamp(8px,1.2vw,11px)] text-lime">{flow.toLowerCase()}</p>
                <div className="mt-2 aspect-square rounded-lg bg-gradient-to-br from-lime/70 to-lime/10" />
                <div className="mt-3 space-y-1.5">
                  <span className="block h-1.5 w-full rounded bg-line" />
                  <span className="block h-1.5 w-3/4 rounded bg-line" />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <span className="aspect-square rounded bg-line" />
                  <span className="aspect-square rounded bg-line" />
                </div>
                <div className="absolute inset-x-[10%] bottom-[5%] h-[6%] rounded-full bg-paper" />
              </div>
            ))}
          </div>

          {/* 4. Code */}
          <div data-scene="code" className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[640px] rounded-xl border border-line bg-panel shadow-2xl">
              <div className="flex gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="ml-3 font-mono text-xs text-dim">ad-studio.tsx</span>
              </div>
              <pre className="overflow-hidden p-5 font-mono text-[clamp(10px,1.6vw,15px)] leading-7">
                {codeLines.map((l, i) => (
                  <div key={i} data-line className={l.c || "text-paper"}>
                    <span className="mr-4 inline-block w-4 text-right text-dim">{i + 1}</span>
                    {l.t}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* 5. Ship */}
          <div data-scene="ship" className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-xl border border-line bg-[#0a0a0b] p-6 font-mono text-[clamp(11px,1.6vw,15px)] leading-8">
              {deployLines.map((l, i) => (
                <div key={i} data-line className={l.c}>
                  {l.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Captions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] px-4 sm:px-10 md:px-16">
        <div className="relative h-20">
          {chapters.map((c, i) => (
            <div key={c.key} data-caption={i} data-scene="caption" className="absolute inset-x-0 bottom-0">
              <p className="font-mono text-xs text-lime">
                0{i + 1} / {c.key}
              </p>
              <p className="mt-2 text-2xl font-medium tracking-tight sm:text-4xl">{c.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress rail */}
      <ol
        data-rail
        aria-hidden
        className="invisible absolute top-1/2 right-4 flex -translate-y-1/2 flex-col gap-4 opacity-0 sm:right-10"
      >
        {chapters.map((c, i) => (
          <li key={c.key} className="flex items-center justify-end gap-3 font-mono text-[10px] text-dim">
            <span className="hidden md:inline">{c.key}</span>
            <span data-dot={i} className="h-2 w-2 rounded-full bg-line" />
          </li>
        ))}
      </ol>

      {/* 6. Final frame */}
      <div
        data-scene="final"
        className="absolute inset-0 flex items-center px-4 sm:px-10 md:px-16"
      >
        <div data-final className="max-w-5xl">
          <p className="font-mono text-sm text-muted">
            <span className="text-lime">●</span> {site.name} · {site.role} · {site.location}
          </p>
          <h2 className="mt-6 text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            Product designer
            <br />
            who <span className="cursor text-lime">builds</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper/75 sm:text-xl">{site.line}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-md bg-lime px-6 py-3.5 font-medium text-ink transition hover:bg-paper"
            >
              View work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line px-6 py-3.5 font-medium transition hover:border-paper"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <p
        data-hint
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-dim"
      >
        scroll <span className="inline-block animate-bounce">↓</span>
      </p>
    </section>
  );
}
