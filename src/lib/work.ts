import type { ComponentType } from "react";
import * as skalx from "@/content/work/skalx.mdx";
import * as neurix from "@/content/work/neurix.mdx";
import * as datareveal from "@/content/work/datareveal.mdx";
import * as foodx from "@/content/work/foodx.mdx";

export type WorkMeta = {
  title: string;
  summary: string;
  role: string;
  timeline: string;
  location?: string;
  tools: string;
  team: string;
  tags: string[];
  marker: string; // short label on the timeline, e.g. "Now" or "2025"
  cover: string; // label for the cover placeholder
  nda?: boolean;
  note?: string; // replaces the default NDA note when set
  seoDescription: string;
};

type MdxModule = { default: ComponentType; meta: WorkMeta };

// Order here is the order on the home page timeline (newest first).
const modules: Record<string, MdxModule> = {
  skalx: skalx as unknown as MdxModule,
  neurix: neurix as unknown as MdxModule,
  datareveal: datareveal as unknown as MdxModule,
  foodx: foodx as unknown as MdxModule,
};

export const works = Object.entries(modules).map(([slug, mod]) => ({
  slug,
  meta: mod.meta,
  Content: mod.default,
}));

export function getWork(slug: string) {
  return works.find((w) => w.slug === slug);
}
