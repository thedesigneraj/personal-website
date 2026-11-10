import type { ComponentType } from "react";
import * as nudge from "@/content/concepts/nudge.mdx";
import * as companion from "@/content/concepts/companion.mdx";

export type ConceptMeta = {
  title: string;
  kind: string;
  tagline: string;
  summary: string;
  year: string;
  tools: string;
  fields: string;
  cover: { src: string; alt: string };
  behance: string;
};

type MdxModule = { default: ComponentType; meta: ConceptMeta };

// Order here is the order on the home page.
const modules: Record<string, MdxModule> = {
  nudge: nudge as unknown as MdxModule,
  companion: companion as unknown as MdxModule,
};

export const concepts = Object.entries(modules).map(([slug, mod]) => ({
  slug,
  meta: mod.meta,
  Content: mod.default,
}));

export function getConcept(slug: string) {
  return concepts.find((c) => c.slug === slug);
}
