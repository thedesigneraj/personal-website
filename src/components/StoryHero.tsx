"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The five chapters: giant word, rail label and caption.
const chapters = [
  { key: "sketch", caption: "It starts on paper." },
  { key: "pixels", caption: "Then it becomes pixels." },
  { key: "product", caption: "Then a product people use." },
  { key: "code", caption: "Now I build it too, coding with AI." },
  { key: "ship", caption: "And I ship it." },
];

// Real work shown in the PRODUCT chapter.
const products = [
  { name: "nudge", src: "/work/hero/nudge-screen.png" },
  { name: "companion", src: "/work/hero/companion-screen.png" },
];

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

const ticker = ["research", "design", "code with AI", "ship", "learn", "repeat"];

const LIME = "#c8f23a";

/** Splits a word into letters that rise in on load (pure CSS, so it works before JS). */
function Letters({ text, offset = 0, attr }: { text: string; offset?: number; attr: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        // Outer span is moved by the scroll timeline; inner span plays the CSS load
        // animation. Keeping them separate stops GSAP from saving a half-faded state.
        <span key={i} className="inline-block" {...{ [attr]: "" }}>
          <span className="rise inline-block" style={{ ["--i" as string]: i + offset }}>
            {ch}
          </span>
        </span>
      ))}
    </>
  );
}

export function StoryHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Cursor spotlight on devices with a real pointer.
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const spot = root.current?.querySelector<HTMLElement>("[data-spot]");
        if (!spot || !root.current) return;
        gsap.set(spot, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
        const xTo = gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const caption = (i: number) => q(`[data-caption="${i}"]`);
        const dot = (i: number) => q(`[data-dot="${i}"]`);
        const word = (i: number) => q(`[data-word="${i}"]`);

        gsap.set(q("[data-scene]:not([data-scene='intro'])"), { autoAlpha: 0 });
        gsap.set(q("[data-scene='intro']"), { autoAlpha: 1 });
        gsap.set(q("[data-caption]"), { autoAlpha: 0, y: 16 });
        gsap.set(q("[data-word]"), { autoAlpha: 1, yPercent: 110 });
        gsap.set(q(".ink"), { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(q("[data-ui]"), { autoAlpha: 0, y: 12 });
        gsap.set(q("[data-phone]"), { xPercent: 0, scale: 0.6, autoAlpha: 0 });
        gsap.set(q("[data-browser]"), { scale: 0.85, y: 40 });
        gsap.set(q("[data-plabel]"), { autoAlpha: 0, y: 8 });
        gsap.set(q("[data-line]"), { autoAlpha: 0, x: -8 });
        gsap.set(q("[data-final-line]"), { yPercent: 110 });
        gsap.set(q("[data-final-fade]"), { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=800%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        });

        // Swap the giant chapter word: old one slides up and out, new one rises in.
        const swapWord = (from: number | null, to: number | null, at: number) => {
          if (from !== null) tl.to(word(from), { yPercent: -110, duration: 0.6, ease: "power3.in" }, at);
          if (to !== null) tl.to(word(to), { yPercent: 0, duration: 0.7, ease: "power3.out" }, at + 0.25);
        };

        // 0. Hello → fly through "AJ"
        tl.to(q("[data-hint]"), { autoAlpha: 0, duration: 0.3 }, 0)
          .to(q("[data-hello], [data-callme]"), { autoAlpha: 0, y: -20, duration: 0.5 }, 0)
          // Explicit start state so scrolling back to the top always restores the name.
          .fromTo(
            q("[data-first]"),
            { yPercent: 0, rotate: 0, autoAlpha: 1 },
            {
              immediateRender: false,
              yPercent: () => gsap.utils.random(-260, -140),
              rotate: () => gsap.utils.random(-40, 40),
              autoAlpha: 0,
              stagger: 0.04,
              duration: 0.8,
              ease: "power2.in",
            },
            0,
          )
          .to(q("[data-aj-wrap]"), { scale: 18, color: LIME, duration: 1.4, ease: "power3.in" }, 0.2)
          .to(q("[data-aj-wrap]"), { autoAlpha: 0, duration: 0.25, ease: "none" }, 1.4)
          .to(q("[data-rail]"), { autoAlpha: 1, duration: 0.4 }, 1.5);

        // 1. Sketch on paper
        swapWord(null, 0, 1.4);
        tl.fromTo(
          q("[data-scene='paper']"),
          { autoAlpha: 0, scale: 1.3, rotate: -14 },
          { autoAlpha: 1, scale: 1, rotate: -4, ease: "power3.out" },
          1.45,
        )
          .to(caption(0), { autoAlpha: 1, y: 0, duration: 0.5 }, 1.7)
          .to(dot(0), { backgroundColor: LIME, scale: 1.6, duration: 0.2 }, 1.7)
          .to(q(".ink"), { strokeDashoffset: 0, stagger: 0.12, duration: 0.8 }, 2.0);

        // 2. Pixels on a laptop
        swapWord(0, 1, 3.8);
        tl.to(caption(0), { autoAlpha: 0, y: -16, duration: 0.4 }, 3.8)
          .to(q("[data-scene='paper']"), { scale: 0.5, rotate: 0, y: -10, autoAlpha: 0 }, 3.8)
          .fromTo(q("[data-scene='laptop']"), { autoAlpha: 0, scale: 0.85, rotateX: 25 }, { autoAlpha: 1, scale: 1, rotateX: 0 }, 3.9)
          .to(q("[data-ui]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.6 }, 4.4)
          .to(caption(1), { autoAlpha: 1, y: 0, duration: 0.5 }, 4.3)
          .to(dot(0), { scale: 1, duration: 0.2 }, 4.3)
          .to(dot(1), { backgroundColor: LIME, scale: 1.6, duration: 0.2 }, 4.3);

        // 3. Products: SkalX rises in, Nudge and Companion slide out on either side.
        swapWord(1, 2, 5.8);
        tl.to(caption(1), { autoAlpha: 0, y: -16, duration: 0.4 }, 5.8)
          .to(q("[data-scene='laptop']"), { autoAlpha: 0, scale: 0.8 }, 5.8)
          .to(q("[data-scene='phones']"), { autoAlpha: 1, duration: 0.3 }, 6.0)
          .to(q("[data-browser]"), { scale: 1, y: 0, ease: "power3.out" }, 6.0)
          .to(q("[data-phone='0']"), { autoAlpha: 1, xPercent: -185, y: 30, scale: 1, rotate: -7, ease: "back.out(1.3)" }, 6.25)
          .to(q("[data-phone='1']"), { autoAlpha: 1, xPercent: 185, y: 30, scale: 1, rotate: 7, ease: "back.out(1.3)" }, 6.25)
          .to(q("[data-plabel]"), { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.4 }, 6.7)
          .to(caption(2), { autoAlpha: 1, y: 0, duration: 0.5 }, 6.3)
          .to(dot(1), { scale: 1, duration: 0.2 }, 6.3)
          .to(dot(2), { backgroundColor: LIME, scale: 1.6, duration: 0.2 }, 6.3);

        // 4. Code
        swapWord(2, 3, 7.8);
        tl.to(caption(2), { autoAlpha: 0, y: -16, duration: 0.4 }, 7.8)
          .to(q("[data-phone]"), { xPercent: 0, rotate: 0, y: 0, scale: 0.6, autoAlpha: 0 }, 7.8)
          .to(q("[data-browser], [data-plabel]"), { autoAlpha: 0, scale: 0.9 }, 7.8)
          .fromTo(q("[data-scene='code']"), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1 }, 8.1)
          .to(q("[data-scene='code'] [data-line]"), { autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.4 }, 8.5)
          .to(caption(3), { autoAlpha: 1, y: 0, duration: 0.5 }, 8.3)
          .to(dot(2), { scale: 1, duration: 0.2 }, 8.3)
          .to(dot(3), { backgroundColor: LIME, scale: 1.6, duration: 0.2 }, 8.3);

        // 5. Ship
        swapWord(3, 4, 10);
        tl.to(caption(3), { autoAlpha: 0, y: -16, duration: 0.4 }, 10)
          .to(q("[data-scene='code']"), { autoAlpha: 0, y: -40, scale: 0.95 }, 10)
          .fromTo(q("[data-scene='ship']"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 }, 10.2)
          .to(q("[data-scene='ship'] [data-line]"), { autoAlpha: 1, x: 0, stagger: 0.18, duration: 0.4 }, 10.6)
          .fromTo(q("[data-live]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, ease: "back.out(2)", duration: 0.5 }, 11.7)
          .to(caption(4), { autoAlpha: 1, y: 0, duration: 0.5 }, 10.4)
          .to(dot(3), { scale: 1, duration: 0.2 }, 10.4)
          .to(dot(4), { backgroundColor: LIME, scale: 1.6, duration: 0.2 }, 10.4);

        // 6. Who I am now
        swapWord(4, null, 12.6);
        tl.to(caption(4), { autoAlpha: 0, duration: 0.4 }, 12.6)
          .to(q("[data-rail]"), { autoAlpha: 0, duration: 0.4 }, 12.6)
          .to(q("[data-scene='ship']"), { autoAlpha: 0, scale: 1.4, duration: 0.8, ease: "power2.in" }, 12.6)
          .to(q("[data-scene='final']"), { autoAlpha: 1, duration: 0.1 }, 13.0)
          .to(q("[data-final-line]"), { yPercent: 0, stagger: 0.12, duration: 0.8, ease: "power4.out" }, 13.0)
          .to(q("[data-final-fade]"), { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6 }, 13.4)
          .to({}, { duration: 0.8 });

        // Whole-story layers: progress bar and grid parallax.
        const total = tl.duration();
        tl.fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: total }, 0);
        tl.to(q("[data-grid]"), { yPercent: -25, ease: "none", duration: total }, 0);

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
      className="story relative h-svh w-full overflow-hidden bg-ink [perspective:1200px]"
    >
      {/* Parallax grid */}
      <div
        aria-hidden
        data-grid
        className="pointer-events-none absolute inset-x-0 -top-[10%] h-[140%] opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        data-spot
        className="pointer-events-none fixed top-0 left-0 z-0 -mt-[300px] -ml-[300px] hidden h-[600px] w-[600px] rounded-full [@media(pointer:fine)]:block"
        style={{ background: "radial-gradient(circle, rgba(200,242,58,0.09), transparent 60%)" }}
      />

      {/* Giant chapter words fill the top of the frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[9%] overflow-hidden text-center md:top-[7%]">
        <div className="relative h-[clamp(4.5rem,19vw,17rem)]">
          {chapters.map((c, i) => (
            <span
              key={c.key}
              data-word={i}
              data-scene="word"
              className="absolute inset-0 block text-[clamp(4.5rem,19vw,17rem)] leading-none font-medium tracking-[-0.05em] uppercase"
              style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(200,242,58,0.38)" }}
            >
              {c.key}
            </span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div aria-hidden className="absolute inset-x-0 top-14 z-10 h-px bg-line">
        <div data-progress className="h-full origin-left scale-x-0 bg-lime" />
      </div>

      {/* 0. Intro */}
      <div
        data-scene="intro"
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      >
        <p data-hello className="font-mono text-sm text-muted">
          <span className="text-lime">~</span> hello, world. I&apos;m
        </p>
        <h1 className="mt-4 text-[clamp(3.5rem,15vw,13rem)] leading-[0.85] font-medium tracking-[-0.04em]">
          <span className="sr-only">Sudharsan AJ</span>
          <span aria-hidden className="block">
            <Letters text="Sudharsan" attr="data-first" />
          </span>
          <span aria-hidden data-aj-wrap className="relative z-10 block origin-center">
            <Letters text="AJ" offset={9} attr="data-aj" />
          </span>
        </h1>
        <p data-callme className="mt-6 max-w-[22rem] text-base text-muted sm:max-w-none sm:text-xl">
          <span className="font-mono text-sm sm:text-base">
            just call me <span className="text-lime">AJ</span>,
          </span>{" "}
          <span className="text-paper">
            product designer who <span className="text-lime">builds</span> and <span className="text-lime">ships</span>.
          </span>
        </p>
      </div>

      {/* Stage holding the story scenes */}
      <div className="absolute inset-x-0 top-[25%] bottom-[19%] flex items-center justify-center px-4 md:top-[24%]">
        <div className="relative h-full w-full max-w-[960px] [transform-style:preserve-3d]">
          {/* 1. Paper */}
          <div
            data-scene="paper"
            className="absolute top-1/2 left-1/2 aspect-[3/4] h-[94%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-paper p-[6%] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
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

          {/* 3. Products: real work. SkalX in a browser, Nudge and Companion on phones. */}
          <div data-scene="phones" className="absolute inset-0 flex items-center justify-center">
            <figure data-browser className="relative z-[2] w-[72%] overflow-hidden rounded-xl border border-[#3a3a38] bg-panel shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] sm:w-[60%]">
              <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="ml-2 truncate rounded bg-ink px-2 py-0.5 font-mono text-[9px] text-muted sm:text-[11px]">skalxai.app</span>
              </div>
              <div className="aspect-[16/10] overflow-hidden">
                <Image src="/work/skalx/hero.jpg" alt="" width={2880} height={1800} sizes="560px" className="h-full w-full object-cover object-top" />
              </div>
            </figure>
            {products.map((p, i) => (
              <figure
                key={p.name}
                data-phone={i}
                className="absolute z-[3] aspect-[186/400] w-[22%] overflow-hidden rounded-[0.9rem] border-[3px] border-[#2a2a28] bg-ink shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] sm:w-[17%] sm:rounded-[1.4rem] sm:border-4"
              >
                <Image src={p.src} alt="" width={186} height={400} sizes="180px" className="h-full w-full object-cover" />
              </figure>
            ))}
            <div className="absolute inset-x-0 -bottom-1 flex justify-center gap-[18%] font-mono text-[10px] text-muted sm:text-xs">
              <span data-plabel>nudge</span>
              <span data-plabel className="text-lime">skalx</span>
              <span data-plabel>companion</span>
            </div>
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
            <div className="relative w-full max-w-[560px] rounded-xl border border-line bg-[#0a0a0b] p-6 font-mono text-[clamp(11px,1.6vw,15px)] leading-8 shadow-2xl">
              {deployLines.map((l, i) => (
                <div key={i} data-line className={l.c}>
                  {l.t}
                </div>
              ))}
              <span
                data-live
                className="absolute -top-4 -right-3 rotate-6 rounded-full bg-lime px-4 py-1.5 font-sans text-sm font-medium text-ink shadow-[0_0_40px_rgba(200,242,58,0.5)] sm:-right-6"
              >
                ● live
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Captions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[5%] px-4 sm:px-10 md:px-16">
        <div className="relative h-20">
          {chapters.map((c, i) => (
            <div key={c.key} data-caption={i} data-scene="caption" className="absolute inset-x-0 bottom-0">
              <p className="font-mono text-xs text-lime">
                0{i + 1} / 05
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
      <div data-scene="final" className="absolute inset-0 flex flex-col justify-center">
        <div className="px-4 sm:px-10 md:px-16">
          <p data-final-fade className="font-mono text-sm text-muted">
            <span className="text-lime">●</span> {site.name} · {site.role} · {site.location}
          </p>
          <h2 className="mt-6 text-[clamp(2.75rem,10vw,9.5rem)] leading-[0.92] font-medium tracking-[-0.045em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-final-line className="block">Product designer</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span data-final-line className="block">
                who <span className="cursor text-lime">builds</span>
              </span>
            </span>
          </h2>
          <p data-final-fade className="mt-6 max-w-xl text-lg text-paper/75 sm:text-xl">
            {site.line}
          </p>
          <div data-final-fade className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="rounded-md bg-lime px-6 py-3.5 font-medium text-ink transition hover:bg-paper">
              View work
            </a>
            <a href="#contact" className="rounded-md border border-line px-6 py-3.5 font-medium transition hover:border-paper">
              Contact
            </a>
          </div>
        </div>
        <div data-final-fade aria-hidden className="absolute inset-x-0 bottom-6 overflow-hidden border-y border-line py-3">
          <div className="marquee flex w-max gap-8 font-mono text-sm text-dim">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-8">
                {ticker.concat(ticker).map((t, i) => (
                  <span key={i}>
                    {t} <span className="text-lime">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <p data-hint className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-dim">
        scroll <span className="inline-block animate-bounce">↓</span>
      </p>

      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  );
}
